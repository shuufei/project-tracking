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
  | 'id'
  | 'title'
  | 'description'
  | 'isDone'
  | 'workTimeSec'
  | 'scheduledTimeSec'
  | 'workStartDateTimestamp'
> & {
  __typename: 'Subtask';
  assign?: Pick<User, 'id'> & { __typename: 'User' };
  task: Pick<Task, 'id'> & { __typename: 'Task' };
};
