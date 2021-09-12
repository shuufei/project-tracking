import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Subtask, Task, UpdateSubtaskInput, User } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateSubtaskUsecase {
  execute: (
    input: UpdateSubtaskInput
  ) => Observable<FetchResult<{ updateSubtask: UpdateSubtaskResponse }>>;
}

export const UPDATE_SUBTASK_USECASE = new InjectionToken<IUpdateSubtaskUsecase>(
  'UpdateSubtaskUsecase'
);

export type UpdateSubtaskResponse = Pick<
  Subtask,
  'id' | 'title' | 'isDone' | 'workTimeSec'
> & {
  __typename: 'Subtask';
  description: NonNullable<Subtask['description']> | null;
  scheduledTimeSec: NonNullable<Subtask['scheduledTimeSec']> | null;
  workStartDateTimestamp: NonNullable<Subtask['workStartDateTimestamp']> | null;
  assign: (Pick<User, 'id'> & { __typename: 'User' }) | null;
  task: Pick<Task, 'id'> & { __typename: 'Task' };
};
