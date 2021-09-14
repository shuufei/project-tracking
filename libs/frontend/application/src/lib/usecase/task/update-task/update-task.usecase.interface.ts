import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import {
  Board,
  Task,
  TaskGroup,
  UpdateTaskInput,
  User,
} from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateTaskUsecase {
  execute: (
    input: UpdateTaskInput
  ) => Observable<FetchResult<{ updateTask: UpdateTaskResponse }>>;
}

export const UPDATE_TASK_USECASE = new InjectionToken<IUpdateTaskUsecase>(
  'UpdateTaskUsecase'
);

export type UpdateTaskResponse = Pick<
  Task,
  'id' | 'title' | 'status' | 'workTimeSec' | 'subtasksOrder'
> & {
  __typename: 'Task';
  description: NonNullable<Task['description']> | null;
  scheduledTimeSec: NonNullable<Task['scheduledTimeSec']> | null;
  workStartDateTimestamp: NonNullable<Task['workStartDateTimestamp']> | null;
  assign: (Partial<User> & { __typename: 'User' }) | null;
  board: Partial<Board> & { __typename: 'Board' };
  taskGroup: (Partial<TaskGroup> & { __typename: 'TaskGroup' }) | null;
};
