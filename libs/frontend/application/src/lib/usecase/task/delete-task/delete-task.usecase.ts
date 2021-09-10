import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Board, Task, TaskGroup } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  DeleteTaskResponse,
  IDeleteTaskUsecase,
} from './delete-task.usecase.interface';

@Injectable()
export class DeleteTaskUsecase implements IDeleteTaskUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IDeleteTaskUsecase['execute']>
  ): ReturnType<IDeleteTaskUsecase['execute']> {
    const [input] = args;
    const deletedTask: DeleteTaskResponse = {
      id: input.id,
      __typename: 'Task',
    };
    return this.apollo.mutate<{ deleteTask: DeleteTaskResponse }>({
      mutation: gql`
        mutation DeleteTask($input: DeleteTaskInput!) {
          deleteTask(input: $input) {
            id
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        deleteTask: deletedTask,
      },
      update(cache) {
        const task = cache.readFragment<Task & StoreObject>({
          id: `Task:${input.id}`,
          fragment: gql`
            fragment Task on Task {
              id
              board {
                id
              }
              taskGroup {
                id
              }
            }
          `,
        });
        if (task == null) {
          return;
        }
        if (task.taskGroup) {
          const taskGroup = cache.readFragment<TaskGroup & StoreObject>({
            id: `TaskGroup:${task.taskGroup.id}`,
            fragment: gql`
              fragment TaskGroup on TaskGroup {
                id
                tasks {
                  id
                }
              }
            `,
          });
          if (taskGroup != null) {
            cache.modify({
              id: cache.identify(taskGroup),
              fields: {
                tasks(taskRefs: Reference[], { readField }) {
                  return taskRefs.filter(
                    (ref) => readField('id', ref) !== input.id
                  );
                },
              },
            });
          }
        }
        const board = cache.readFragment<Board & StoreObject>({
          id: `Board:${task.board.id}`,
          fragment: gql`
            fragment Board on Board {
              id
              tasks {
                id
              }
            }
          `,
        });
        if (board != null) {
          cache.modify({
            id: cache.identify(board),
            fields: {
              tasks(taskRefs: Reference[], { readField }) {
                return taskRefs.filter(
                  (ref) => readField('id', ref) !== input.id
                );
              },
            },
          });
        }
      },
    });
  }
}
