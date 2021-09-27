import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Board, TaskGroup } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  DeleteTaskGroupResponse,
  IDeleteTaskGroupUsecase,
} from './delete-task-group.usecase.interface';

@Injectable()
export class DeleteTaskGroupUsecase implements IDeleteTaskGroupUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IDeleteTaskGroupUsecase['execute']>
  ): ReturnType<IDeleteTaskGroupUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ deleteTaskGroup: DeleteTaskGroupResponse }>({
      mutation: gql`
        mutation DeleteTask($input: DeleteTaskGroupInput!) {
          deleteTaskGroup(input: $input) {
            id
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        deleteTaskGroup: {
          id: input.id,
          __typename: 'TaskGroup',
        },
      },
      update(cache) {
        const taskGroup = cache.readFragment<TaskGroup & StoreObject>({
          id: `TaskGroup:${input.id}`,
          fragment: gql`
            fragment TaskGroup on TaskGroup {
              id
              board {
                id
              }
            }
          `,
        });
        if (taskGroup == null) {
          return;
        }
        const board = cache.readFragment<Board & StoreObject>({
          id: `Board:${taskGroup.board.id}`,
          fragment: gql`
            fragment Board on Board {
              id
              taskGroups {
                id
              }
            }
          `,
        });
        if (board == null) {
          return;
        }
        cache.modify({
          id: cache.identify(board),
          fields: {
            taskGroups(taskGroupRefs: Reference[], { readField }) {
              return taskGroupRefs.filter(
                (ref) => readField('id', ref) !== input.id
              );
            },
          },
        });
      },
    });
  }
}
