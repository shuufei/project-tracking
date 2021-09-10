import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Board, Project } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  DeleteBoardResponse,
  IDeleteBoardUsecase,
} from './delete-board.usecase.interface';

@Injectable()
export class DeleteBoardUsecase implements IDeleteBoardUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IDeleteBoardUsecase['execute']>
  ): ReturnType<IDeleteBoardUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ deleteBoard: DeleteBoardResponse }>({
      mutation: gql`
        mutation DeleteBoard($input: DeleteBoardInput!) {
          deleteBoard(input: $input) {
            id
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        deleteBoard: {
          id: input.id,
          __typename: 'Board',
        },
      },
      update(cache) {
        const board = cache.readFragment<Board & StoreObject>({
          id: `Board:${input.id}`,
          fragment: gql`
            fragment Board on Board {
              id
              project {
                id
              }
            }
          `,
        });
        if (board == null) {
          return;
        }
        const project = cache.readFragment<Project & StoreObject>({
          id: `Project:${board.project.id}`,
          fragment: gql`
            fragment Project on Project {
              id
              boards {
                id
              }
            }
          `,
        });
        if (project == null) {
          return;
        }
        cache.modify({
          id: cache.identify(project),
          fields: {
            boards(boardRefs: Reference[], { readField }) {
              return boardRefs.filter(
                (ref) => readField('id', ref) !== input.id
              );
            },
          },
        });
      },
    });
  }
}
