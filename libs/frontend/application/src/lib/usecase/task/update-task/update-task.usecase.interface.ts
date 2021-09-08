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
  | 'id'
  | 'title'
  | 'description'
  | 'status'
  | 'workTimeSec'
  | 'scheduledTimeSec'
  | 'workStartDateTimestamp'
  | 'subtasksOrder'
> & {
  __typename: 'Task';
  assign?: Partial<User> & { __typename: 'User' };
  board: Partial<Board> & { __typename: 'Board' };
  taskGroup: Partial<TaskGroup> & { __typename: 'TaskGroup' };
};
