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

  /**
   * FIXME:
   * createSubtaskのリクエストが完了後、id: tmp-idでSubtask Queryが実行されてしまう。
   * アプリケーションの動作上は問題ないが、APIとしてはエラーになる。(tmp-idのsubtaskは存在しないため)
   */
  execute(
    ...args: Parameters<ICreateSubtaskUsecase['execute']>
  ): ReturnType<ICreateSubtaskUsecase['execute']> {
    const [input] = args;
    const createdSubtask: CreateSubtaskResponse = {
      id: 'tmp-id',
      title: input.title,
      description: input.description ?? null,
      isDone: false,
      workTimeSec: 0,
      scheduledTimeSec: input.scheduledTimeSec ?? null,
      workStartDateTimestamp: null,
      createdAt: new Date().valueOf(),
      assign:
        input.assignUserId != null
          ? {
              id: input.assignUserId,
              __typename: 'User',
            }
          : null,
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
            isDone
            workTimeSec
            scheduledTimeSec
            workStartDateTimestamp
            assign {
              id
            }
            task {
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
                  fragment NewSubtask on Subtask {
                    id
                  }
                `,
              });
              const included = subtaskRefs.some(
                (ref) => readField('id', ref) === newSubtask.id
              );
              const updatedSubtaskRefs = included
                ? subtaskRefs
                : [...subtaskRefs, newSubtaskRef];
              return updatedSubtaskRefs;
            },
          },
        });
      },
    });
  }
}
