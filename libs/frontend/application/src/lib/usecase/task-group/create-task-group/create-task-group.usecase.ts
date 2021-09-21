import { Injectable } from '@angular/core';
import { Reference, StoreObject } from '@apollo/client';
import { Board, Status } from '@bison/shared/schema';
import { Apollo, gql } from 'apollo-angular';
import {
  CreateTaskGroupResponse,
  ICreateTaskGroupUsecase,
} from './create-task-group.usecase.interface';

@Injectable()
export class CreateTaskGroupUsecase implements ICreateTaskGroupUsecase {
  constructor(private apollo: Apollo) {}

  execute(
    ...args: Parameters<ICreateTaskGroupUsecase['execute']>
  ): ReturnType<ICreateTaskGroupUsecase['execute']> {
    const [input, projectId] = args;
    const createdTaskGroup: CreateTaskGroupResponse = {
      id: 'tmp-id',
      title: input.title,
      description: input.description ?? null,
      status: Status.TODO,
      tasks: [],
      scheduledTimeSec: 0,
      tasksOrder: [],
      assign:
        input.assignUserId != null
          ? {
              id: input.assignUserId,
              __typename: 'User',
            }
          : null,
      project: {
        id: projectId,
        __typename: 'Project',
      },
      board: {
        id: input.boardId,
        __typename: 'Board',
      },
      createdAt: new Date().valueOf(),
      __typename: 'TaskGroup',
    };
    return this.apollo.mutate<{ createTaskGroup: CreateTaskGroupResponse }>({
      mutation: gql`
        mutation CreateTaskGroup($input: CreateTaskGroupInput!) {
          createTaskGroup(input: $input) {
            id
            title
            description
            status
            tasks {
              id
            }
            scheduledTimeSec
            tasksOrder
            assign {
              id
            }
            project {
              id
            }
            board {
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
        createTaskGroup: createdTaskGroup,
      },
      update(cache, response) {
        if (response.data?.createTaskGroup == null) {
          return;
        }
        const newTaskGroup = response.data.createTaskGroup;
        const board = cache.readFragment<Board & StoreObject>({
          id: `Board:${input.boardId}`,
          fragment: gql`
            fragment Board on Board {
              id
              taskGroups {
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
            taskGroups(taskGroupRefs: Reference[], { readField }) {
              const newTaskGroupRef = cache.writeFragment({
                data: newTaskGroup,
                fragment: gql`
                  fragment NewTaskGroup on TaskGroup {
                    id
                  }
                `,
              });
              const included = taskGroupRefs.some(
                (ref) => readField('id', ref) === newTaskGroup.id
              );
              const updatedTaskGroupRefs = included
                ? taskGroupRefs
                : [...taskGroupRefs, newTaskGroupRef];
              return updatedTaskGroupRefs;
            },
          },
        });
      },
    });
  }
}
