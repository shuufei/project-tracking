import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Project } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateBoardResponse,
  ICreateBoardUsecase,
} from './create-board.usecase.interface';

@Injectable()
export class CreateBoardUsecase implements ICreateBoardUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<ICreateBoardUsecase['execute']>
  ): ReturnType<ICreateBoardUsecase['execute']> {
    const [input] = args;
    const createdBoard: CreateBoardResponse = {
      id: 'tmp-id',
      name: input.name,
      description: input.description ?? null,
      tasksOrder: [],
      createdAt: new Date().valueOf(),
      __typename: 'Board',
      project: {
        id: input.projectId,
        __typename: 'Project',
      },
    };
    return this.apollo.mutate<{ createBoard: CreateBoardResponse }>({
      mutation: gql`
        mutation CreateBoard($input: CreateBoardInput!) {
          createBoard(input: $input) {
            id
            name
            description
            project {
              id
            }
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
            createdAt
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        createBoard: createdBoard,
      },
      update(cache, response) {
        if (response.data?.createBoard == null) {
          return;
        }
        const newBoard = response.data.createBoard;
        const project = cache.readFragment<Project & StoreObject>({
          id: `Project:${input.projectId}`,
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
              const newBoardRef = cache.writeFragment({
                data: newBoard,
                fragment: gql`
                  fragment NewBoard on Board {
                    id
                  }
                `,
              });
              if (
                boardRefs.some((ref) => readField('id', ref) === newBoard.id)
              ) {
                return boardRefs;
              } else {
                return [...boardRefs, newBoardRef];
              }
            },
          },
        });
      },
    });
  }
}
