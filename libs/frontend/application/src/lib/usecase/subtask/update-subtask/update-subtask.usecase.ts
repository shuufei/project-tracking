import { Injectable } from '@angular/core';
import { Subtask } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IUpdateSubtaskUsecase } from './update-subtask.usecase.interface';

@Injectable()
export class UpdateSubtaskUsecase implements IUpdateSubtaskUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateSubtaskUsecase['execute']>
  ): ReturnType<IUpdateSubtaskUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ updateSubtask: Subtask }>({
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
    });
  }
}
