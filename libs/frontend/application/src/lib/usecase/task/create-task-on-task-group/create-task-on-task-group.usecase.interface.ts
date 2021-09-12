import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import {
  Board,
  CreateTaskOnTaskGroupInput,
  Project,
  Task,
  TaskGroup,
  User,
} from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateTaskOnTaskGroupUsecase {
  excute: (
    input: CreateTaskOnTaskGroupInput,
    projectId: Project['id'],
    boardId: Board['id']
  ) => Observable<
    FetchResult<{ createTaskOnTaskGroup: CreateTaskOnTaskGroupResponse }>
  >;
}

export const CREATE_TASK_ON_TASK_GROUP_USECASE = new InjectionToken<ICreateTaskOnTaskGroupUsecase>(
  'CreateTaskUsecaseOnTaskGroup'
);

export type CreateTaskOnTaskGroupResponse = Pick<
  Task,
  | 'id'
  | 'title'
  | 'status'
  | 'subtasks'
  | 'workTimeSec'
  | 'subtasksOrder'
  | 'createdAt'
> & {
  __typename: 'Task';
  description: NonNullable<Task['description']> | null;
  scheduledTimeSec: NonNullable<Task['scheduledTimeSec']> | null;
  workStartDateTimestamp: NonNullable<Task['workStartDateTimestamp']> | null;
  assign: (Pick<User, 'id'> & { __typename: 'User' }) | null;
  taskGroup: Pick<TaskGroup, 'id'> & { __typename: 'TaskGroup' };
  board: Pick<Board, 'id'> & {
    __typename: 'Board';
    project: Pick<Project, 'id'> & { __typename: 'Project' };
  };
};
