import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Task, TaskGroup } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import { ICreateTaskOnTaskGroupUsecase } from './create-task-on-task-group.usecase.interface';

@Injectable()
export class CreateTaskOnTaskGroupUsecase
  implements ICreateTaskOnTaskGroupUsecase {
  constructor(private apollo: Apollo) {}

  excute(
    ...args: Parameters<ICreateTaskOnTaskGroupUsecase['excute']>
  ): ReturnType<ICreateTaskOnTaskGroupUsecase['excute']> {
    const [input, { fields, name }] = args;
    return this.apollo.mutate<{ createTaskOnTaskGroup: Task }>({
      mutation: gql`
        ${fields}
        mutation CreateTaskOnTaskGroup($input: CreateTaskOnTaskGroupInput!) {
          createTaskOnTaskGroup(input: $input) {
            ...${name}
          }
        }
      `,
      variables: {
        input,
      },
      update(cache, response) {
        if (response.data?.createTaskOnTaskGroup == null) {
          return;
        }
        const newTask = response.data.createTaskOnTaskGroup;
        const taskGroup = cache.readFragment<TaskGroup & StoreObject>({
          id: `TaskGroup:${input.taskGroupId}`,
          fragment: gql`
            fragment TaskGroup on TaskGroup {
              id
              tasks {
                id
              }
            }
          `,
        });
        if (taskGroup == null) {
          return;
        }
        cache.modify({
          id: cache.identify(taskGroup),
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              const newTaskRef = cache.writeFragment({
                data: newTask,
                fragment: gql`
                  fragment newTaskGroup on TaskGroup {
                    id
                  }
                `,
              });
              if (taskRefs.some((ref) => readField('id', ref) === newTask.id)) {
                return taskRefs;
              } else {
                return [...taskRefs, newTaskRef];
              }
            },
          },
        });
      },
    });
  }
}
