import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  IUpdateBoardUsecase,
  UpdateBoardResponse,
} from './update-board.usecase.interface';

@Injectable()
export class UpdateBoardUsecase implements IUpdateBoardUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IUpdateBoardUsecase['execute']>
  ): ReturnType<IUpdateBoardUsecase['execute']> {
    const [input] = args;
    const updatedBoard: UpdateBoardResponse = {
      id: input.id,
      name: input.name,
      description: input.description,
      tasksOrder: input.tasksOrder,
      __typename: 'Board',
      project: {
        id: input.projectId,
        __typename: 'Project',
      },
    };
    return this.apollo.mutate<{ updateBoard: UpdateBoardResponse }>({
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
      optimisticResponse: {
        updateBoard: updatedBoard,
      },
    });
  }
}
