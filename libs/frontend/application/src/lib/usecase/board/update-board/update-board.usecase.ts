import { Injectable } from '@angular/core';
import { Board } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { IUpdateBoardUsecase } from './update-board.usecase.interface';

@Injectable()
export class UpdateBoardUsecase implements IUpdateBoardUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateBoardUsecase['execute']>
  ): ReturnType<IUpdateBoardUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ upateBoard: Board }>({
      mutation: gql`
        mutation UpdateBoard($input: UpdateBoardInput!) {
          updateBoard(input: $input) {
            id
            name
            description
            soloTasks {
              id
            }
            taskGroups {
              id
            }
            tasksOrder {
              taskId
              type
            }
          }
        }
      `,
      variables: {
        input,
      },
    });
  }
}
