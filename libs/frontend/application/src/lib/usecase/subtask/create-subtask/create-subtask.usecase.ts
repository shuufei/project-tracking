import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Task } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateSubtaskResponse,
  ICreateSubtaskUsecase,
} from './create-subtask.usecase.interface';

@Injectable()
export class CreateSubtaskUsecase implements ICreateSubtaskUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<ICreateSubtaskUsecase['execute']>
  ): ReturnType<ICreateSubtaskUsecase['execute']> {
    const [input] = args;
    const createdSubtask: CreateSubtaskResponse = {
      id: 'tmp-id',
      title: input.title,
      description: input.description,
      scheduledTimeSec: input.scheduledTimeSec,
      assign:
        input.assignUserId != null
          ? {
              id: input.assignUserId,
              __typename: 'User',
            }
          : undefined,
      task: {
        id: input.taskId,
        __typename: 'Task',
      },
      __typename: 'Subtask',
    };
    return this.apollo.mutate<{ createSubtask: CreateSubtaskResponse }>({
      mutation: gql`
        mutation CreateSubtask($input: CreateSubtaskInput!) {
          createSubtask(input: $input) {
            id
            title
            description
            assign {
              id
            }
            task {
              id
            }
            scheduledTimeSec
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        createSubtask: createdSubtask,
      },
      update(cache, response) {
        if (response.data?.createSubtask == null) {
          return;
        }
        const newSubtask = response.data.createSubtask;
        const task = cache.readFragment<Task & StoreObject>({
          id: `Task:${input.taskId}`,
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
              const newSubtaskRef = cache.writeFragment({
                data: newSubtask,
                fragment: gql`
                  fragment NewTask on Task {
                    id
                  }
                `,
              });
              if (
                subtaskRefs.some(
                  (ref) => readField('id', ref) === newSubtask.id
                )
              ) {
                return subtaskRefs;
              } else {
                return [...subtaskRefs, newSubtaskRef];
              }
            },
          },
        });
      },
    });
  }
}
