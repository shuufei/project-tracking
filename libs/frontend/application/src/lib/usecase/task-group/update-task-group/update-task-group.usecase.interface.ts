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
  'id' | 'title' | 'description' | 'status' | 'scheduledTimeSec' | 'tasksOrder'
> & {
  __typename: 'TaskGroup';
  assign?: { id: User['id']; __typename: 'User' };
  board: { id: Board['id']; __typename: 'Board' };
};
