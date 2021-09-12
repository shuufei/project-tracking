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
    const [input, projectId, boardId] = args;
    const createdTask: CreateTaskOnTaskGroupResponse = {
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
      taskGroup: {
        id: input.taskGroupId,
        __typename: 'TaskGroup',
      },
      board: {
        id: boardId,
        __typename: 'Board',
        project: {
          id: projectId,
          __typename: 'Project',
        },
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
