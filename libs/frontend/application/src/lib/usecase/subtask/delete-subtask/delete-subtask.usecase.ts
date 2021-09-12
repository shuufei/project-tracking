import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Subtask, Task } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  DeleteSubtaskResponse,
  IDeleteSubtaskUsecase,
} from './delete-subtask.usecase.interface';

@Injectable()
export class DeleteSubtaskUsecase implements IDeleteSubtaskUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<IDeleteSubtaskUsecase['execute']>
  ): ReturnType<IDeleteSubtaskUsecase['execute']> {
    const [input] = args;
    return this.apollo.mutate<{ deleteSubtask: DeleteSubtaskResponse }>({
      mutation: gql`
        mutation DeleteSubtask($input: DeleteSubtaskInput!) {
          deleteSubtask(input: $input) {
            id
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        deleteSubtask: {
          id: input.id,
          __typename: 'Subtask',
        },
      },
      update(cache) {
        const subtask = cache.readFragment<Subtask & StoreObject>({
          id: `Subtask:${input.id}`,
          fragment: gql`
            fragment Subtask on Subtask {
              id
              task {
                id
              }
            }
          `,
        });
        if (subtask == null) {
          return;
        }
        const task = cache.readFragment<Task & StoreObject>({
          id: `Task:${subtask.task.id}`,
          fragment: gql`
            fragment Task on Task {
              id
              subtasks {
                id
              }
            }
          `,
        });
        if (task == null) {
          return;
        }
        cache.modify({
          id: cache.identify(task),
          fields: {
            subtasks(subtaskRefs: Reference[], { readField }) {
              return subtaskRefs.filter(
                (ref) => readField('id', ref) !== input.id
              );
            },
          },
        });
      },
    });
  }
}
