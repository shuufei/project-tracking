import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  IUpdateTaskUsecase,
  UpdateTaskResponse,
} from './update-task.usecase.interface';

@Injectable()
export class UpdateTaskUsecase implements IUpdateTaskUsecase {
  constructor(private apollo: Apollo) {}
  execute(
    ...args: Parameters<IUpdateTaskUsecase['execute']>
  ): ReturnType<IUpdateTaskUsecase['execute']> {
    const [input] = args;
    const updatedTask: UpdateTaskResponse = {
      id: input.id,
      title: input.title,
      description: input.description ?? null,
      status: input.status,
      assign:
        input.assignUserId != null
          ? {
              id: input.assignUserId,
              __typename: 'User',
            }
          : null,
      workTimeSec: input.workTimeSec,
      scheduledTimeSec: input.scheduledTimeSec ?? null,
      workStartDateTimestamp: input.workStartDateTimestamp ?? null,
      subtasksOrder: input.subtasksOrder,
      board: {
        id: input.boardId,
        __typename: 'Board',
      },
      taskGroup: {
        id: input.taskGroupId,
        __typename: 'TaskGroup',
      },
      __typename: 'Task',
    };
    return this.apollo.mutate<{ updateTask: UpdateTaskResponse }>({
      mutation: gql`
        mutation UpdateTask($input: UpdateTaskInput!) {
          updateTask(input: $input) {
            id
            title
            description
            status
            assign {
              id
            }
            workTimeSec
            scheduledTimeSec
            workStartDateTimestamp
            subtasksOrder
            board {
              id
            }
            taskGroup {
              id
            }
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        updateTask: updatedTask,
      },
    });
  }
}
