import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import {
  Board,
  TaskGroup,
  UpdateTaskGroupInput,
  User,
} from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateTaskGroupUsecase {
  execute: (
    input: UpdateTaskGroupInput
  ) => Observable<FetchResult<{ updateTaskGroup: UpdateTaskGroupResponse }>>;
}

export const UPDATE_TASK_GROUP_USECASE = new InjectionToken<IUpdateTaskGroupUsecase>(
  'UpdateTaskGroupUsecase'
);

export type UpdateTaskGroupResponse = Pick<
  TaskGroup,
  'id' | 'title' | 'status' | 'tasksOrder'
> & {
  description: NonNullable<TaskGroup['description']> | null;
  scheduledTimeSec: NonNullable<TaskGroup['scheduledTimeSec']> | null;
  __typename: 'TaskGroup';
  assign: { id: User['id']; __typename: 'User' } | null;
  board: { id: Board['id']; __typename: 'Board' };
};
