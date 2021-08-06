import { Injectable } from '@angular/core';
import { Task } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IUpdateTaskUsecase } from './update-task.usecase.interface';

@Injectable()
export class UpdateTaskUsecase implements IUpdateTaskUsecase {
  constructor(private apollo: Apollo) {}
  execute(
    ...args: Parameters<IUpdateTaskUsecase['execute']>
  ): ReturnType<IUpdateTaskUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ updateTask: Task }>({
      mutation: gql`
        mutation UpdateTask($input: UpdateTaskInput!) {
          updateTask(input: $input) {
            id
            title
            title
            description
            status
            subtasks {
              id
            }
            assign {
              id
              name
              icon
            }
            board {
              id
            }
            taskGroup {
              id
            }
            workTimeSec
            scheduledTimeSec
            subtasksOrder
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
