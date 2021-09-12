import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  IUpdateSubtaskUsecase,
  UpdateSubtaskResponse,
} from './update-subtask.usecase.interface';

@Injectable()
export class UpdateSubtaskUsecase implements IUpdateSubtaskUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateSubtaskUsecase['execute']>
  ): ReturnType<IUpdateSubtaskUsecase['execute']> {
    const [input] = args;
    const updatedSubtask: UpdateSubtaskResponse = {
      id: input.id,
      title: input.title,
      description: input.description ?? null,
      isDone: input.isDone,
      workTimeSec: input.workTimeSec,
      scheduledTimeSec: input.scheduledTimeSec ?? null,
      workStartDateTimestamp: input.workStartDateTimestamp ?? null,
      assign:
        input.assignUserId != null
          ? { id: input.assignUserId, __typename: 'User' }
          : null,
      task: {
        id: input.taskId,
        __typename: 'Task',
      },
      __typename: 'Subtask',
    };
    return this.apollo.mutate<{ updateSubtask: UpdateSubtaskResponse }>({
      mutation: gql`
        mutation UpdateSubtask($input: UpdateSubtaskInput!) {
          updateSubtask(input: $input) {
            id
            title
            description
            isDone
            assign {
              id
              name
              icon
            }
            workTimeSec
            scheduledTimeSec
            workStartDateTimestamp
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        updateSubtask: updatedSubtask,
      },
    });
  }
}
