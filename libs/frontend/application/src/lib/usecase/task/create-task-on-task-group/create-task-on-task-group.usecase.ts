import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Status, TaskGroup } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateTaskOnTaskGroupResponse,
  ICreateTaskOnTaskGroupUsecase,
} from './create-task-on-task-group.usecase.interface';

@Injectable()
export class CreateTaskOnTaskGroupUsecase
  implements ICreateTaskOnTaskGroupUsecase {
  constructor(private apollo: Apollo) {}

  excute(
    ...args: Parameters<ICreateTaskOnTaskGroupUsecase['excute']>
  ): ReturnType<ICreateTaskOnTaskGroupUsecase['excute']> {
    const [input] = args;
    const createdTask: CreateTaskOnTaskGroupResponse = {
      id: 'tmp-id',
      title: input.title,
      description: input.description,
      scheduledTimeSec: input.scheduledTimeSec,
      status: Status.TODO,
      subtasks: [],
      workTimeSec: 0,
      subtasksOrder: [],
      createdAt: new Date().valueOf(),
      assign:
        input.assignUserId != null
          ? {
              id: input.assignUserId,
              __typename: 'User',
            }
          : undefined,
      taskGroup: {
        id: input.taskGroupId,
        __typename: 'TaskGroup',
      },
      __typename: 'Task',
    };
    return this.apollo.mutate<{
      createTaskOnTaskGroup: CreateTaskOnTaskGroupResponse;
    }>({
      mutation: gql`
        mutation CreateTaskOnTaskGroup($input: CreateTaskOnTaskGroupInput!) {
          createTaskOnTaskGroup(input: $input) {
            id
            title
            description
            status
            subtasks {
              id
            }
            assign {
              id
            }
            taskGroup {
              id
            }
            workTimeSec
            scheduledTimeSec
            workStartDateTimestamp
            subtasksOrder
            createdAt
          }
        }
      `,
      variables: {
        input,
      },
      optimisticResponse: {
        createTaskOnTaskGroup: createdTask,
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
