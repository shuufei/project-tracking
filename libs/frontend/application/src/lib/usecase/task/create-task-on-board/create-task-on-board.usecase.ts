import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Board, Status } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateTaskOnBoardResponse,
  ICreateTaskOnBoardUsecase,
} from './create-task-on-board.usecase.interface';

@Injectable()
export class CreateTaskOnBoardUsecase implements ICreateTaskOnBoardUsecase {
  constructor(private apollo: Apollo) {}

  /**
   * FIXME:
   * createTaskOnBoardのリクエストが完了後、id: tmp-idでTask Queryが実行されてしまう。
   * アプリケーションの動作上は問題ないが、APIとしてはエラーになる。(tmp-idのsubtaskは存在しないため)
   */
  excute(
    ...args: Parameters<ICreateTaskOnBoardUsecase['excute']>
  ): ReturnType<ICreateTaskOnBoardUsecase['excute']> {
    const [input, projectId] = args;
    const createdTask: CreateTaskOnBoardResponse = {
      id: 'tmp-id',
      title: input.title,
      description: input.description ?? null,
      status: Status.TODO,
      subtasks: [],
      workTimeSec: 0,
      scheduledTimeSec: input.scheduledTimeSec ?? null,
      workStartDateTimestamp: null,
      subtasksOrder: [],
      createdAt: new Date().valueOf(),
      assign:
        input.assignUserId != null
          ? {
              id: input.assignUserId,
              __typename: 'User',
            }
          : null,
      taskGroup: null,
      board: {
        id: input.boardId,
        __typename: 'Board',
        project: {
          id: projectId,
          __typename: 'Project',
        },
      },
      __typename: 'Task',
    };
    return this.apollo.mutate<{
      createTaskOnBoard: CreateTaskOnBoardResponse;
    }>({
      mutation: gql`
        mutation CreateTaskOnBoard($input: CreateTaskOnBoardInput!) {
          createTaskOnBoard(input: $input) {
            id
            title
            description
            status
            workTimeSec
            scheduledTimeSec
            workStartDateTimestamp
            subtasksOrder
            board {
              id
              project {
                id
              }
            }
            subtasks {
              id
            }
            assign {
              id
            }
            taskGroup {
              id
            }
            createdAt
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        createTaskOnBoard: createdTask,
      },
      update(cache, response) {
        if (response.data?.createTaskOnBoard == null) {
          return;
        }
        const newTask = response.data.createTaskOnBoard;
        const board = cache.readFragment<Board & StoreObject>({
          id: `Board:${input.boardId}`,
          fragment: gql`
            fragment Board on Board {
              id
              soloTasks {
                id
              }
            }
          `,
        });
        if (board == null) {
          return;
        }
        cache.modify({
          id: cache.identify(board),
          fields: {
            soloTasks(taskRefs: Reference[], { readField }) {
              const newTaskRef = cache.writeFragment({
                data: newTask,
                fragment: gql`
                  fragment NewTask on Task {
                    id
                  }
                `,
              });
              const included = taskRefs.some(
                (ref) => readField('id', ref) === newTask.id
              );
              const updatedTaskRefs = included
                ? taskRefs
                : [...taskRefs, newTaskRef];
              return updatedTaskRefs;
            },
          },
        });
      },
    });
  }
}
