import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  IUpdateTaskGroupUsecase,
  UpdateTaskGroupResponse,
} from './update-task-group.usecase.interface';

@Injectable()
export class UpdateTaskGroupUsecase implements IUpdateTaskGroupUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateTaskGroupUsecase['execute']>
  ): ReturnType<IUpdateTaskGroupUsecase['execute']> {
    const [input] = args;
    const updatedTaskGroup: UpdateTaskGroupResponse = {
      __typename: 'TaskGroup',
      id: input.id,
      title: input.title,
      description: input.description ?? null,
      status: input.status,
      scheduledTimeSec: input.scheduledTimeSec ?? null,
      tasksOrder: input.tasksOrder,
      assign:
        input.assignUserId != null
          ? { id: input.assignUserId, __typename: 'User' }
          : null,
      board: {
        id: input.boardId,
        __typename: 'Board',
      },
    };
    return this.apollo.mutate<{ updateTaskGroup: UpdateTaskGroupResponse }>({
      mutation: gql`
        mutation UpdateTaskGroup($input: UpdateTaskGroupInput!) {
          updateTaskGroup(input: $input) {
            id
            title
            description
            status
            assign {
              id
            }
            scheduledTimeSec
            board {
              id
            }
            tasksOrder
          }
        }
      `,
      variables: { input },
      optimisticResponse: {
        updateTaskGroup: updatedTaskGroup,
      },
    });
  }
}
