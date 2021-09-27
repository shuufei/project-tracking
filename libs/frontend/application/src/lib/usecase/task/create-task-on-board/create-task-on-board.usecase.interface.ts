import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import {
  Board,
  CreateTaskOnBoardInput,
  Project,
  Task,
  TaskGroup,
  User,
} from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateTaskOnBoardUsecase {
  excute: (
    input: CreateTaskOnBoardInput,
    projectId: Project['id']
  ) => Observable<
    FetchResult<{ createTaskOnBoard: CreateTaskOnBoardResponse }>
  >;
}

export const CREATE_TASK_ON_BOARD_USECASE = new InjectionToken<ICreateTaskOnBoardUsecase>(
  'CreateTaskUsecaseOnBoard'
);

export type CreateTaskOnBoardResponse = Pick<
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
  taskGroup: (Pick<TaskGroup, 'id'> & { __typename: 'TaskGroup' }) | null;
  board: Pick<Board, 'id'> & {
    __typename: 'Board';
    project: Pick<Project, 'id'> & { __typename: 'Project' };
  };
};
