import { Injectable } from '@angular/core';
import { TaskGroup } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IUpdateTaskGroupUsecase } from './update-task-group.usecase.interface';

@Injectable()
export class UpdateTaskGroupUsecase implements IUpdateTaskGroupUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateTaskGroupUsecase['execute']>
  ): ReturnType<IUpdateTaskGroupUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ updateTaskGroup: TaskGroup }>({
      mutation: gql`
        mutation UpdateTaskGroup($input: UpdateTaskGroupInput!) {
          updateTaskGroup(input: $input) {
            id
            title
            description
            status
            assign {
              id
              name
              icon
            }
            board {
              id
              name
            }
            scheduledTimeSec
            tasksOrder
          }
        }
      `,
      variables: { input },
    });
  }
}
