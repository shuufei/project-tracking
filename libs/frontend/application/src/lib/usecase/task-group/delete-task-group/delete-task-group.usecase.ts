import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Board, Task, TaskGroup } from '@bison/shared/schema';
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
        mutation DeleteTask($input: DeleteTaskInput!) {
          deleteTask(input: $input) {
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
        const task = cache.readFragment<Task & StoreObject>({
          id: `Task:${input.id}`,
          fragment: gql`
            fragment Task on Task {
              id
              taskGroup {
                id
              }
              board {
                id
              }
            }
          `,
        });
        if (task == null) {
          return;
        }
        if (task.taskGroup != null) {
          const taskGroup = cache.readFragment<TaskGroup & StoreObject>({
            id: `TaskGroup:${task.taskGroup.id}`,
            fragment: gql`
              fragment TaskGroup on TaskGroup {
                id
                tasks {
                  id
                }
              }
            `,
          });
          if (taskGroup == null) {
            return;
          }
          cache.modify({
            id: cache.identify(taskGroup),
            fields: {
              tasks(taskRefs: Reference[], { readField }) {
                return taskRefs.filter(
                  (ref) => readField('id', ref) !== input.id
                );
              },
            },
          });
        } else {
          const board = cache.readFragment<Board & StoreObject>({
            id: `Board:${task.board.id}`,
            fragment: gql`
              fragment Board on Board {
                id
                soloTasks {
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
              soloTasks(soloTaskRefs: Reference[], { readField }) {
                return soloTaskRefs.filter(
                  (ref) => readField('id', ref) !== input.id
                );
              },
            },
          });
        }
      },
    });
  }
}
