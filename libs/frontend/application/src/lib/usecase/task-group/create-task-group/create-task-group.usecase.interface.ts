import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import {
  Board,
  CreateTaskGroupInput,
  Project,
  Task,
  TaskGroup,
  User,
} from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateTaskGroupUsecase {
  execute: (
    input: CreateTaskGroupInput,
    projectId: Project['id']
  ) => Observable<FetchResult<{ createTaskGroup: CreateTaskGroupResponse }>>;
}

export const CREATE_TASK_GROUP_USECASE = new InjectionToken<ICreateTaskGroupUsecase>(
  'CreateTaskGroupUsecase'
);

export type CreateTaskGroupResponse = Pick<
  TaskGroup,
  'id' | 'title' | 'status' | 'scheduledTimeSec' | 'tasksOrder' | 'createdAt'
> & {
  __typename: 'TaskGroup';
  description: NonNullable<TaskGroup['description']> | null;
  tasks: {
    id: Task['id'];
    __typename: 'Task';
  }[];
  assign: {
    id: User['id'];
    __typename: 'User';
  } | null;
  project: Pick<Project, 'id'> & { __typename: 'Project' };
  board: Pick<Board, 'id'> & {
    __typename: 'Board';
  };
};
