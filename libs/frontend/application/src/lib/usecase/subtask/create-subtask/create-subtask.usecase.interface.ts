import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CreateSubtaskInput, Subtask, Task, User } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateSubtaskUsecase {
  execute: (
    input: CreateSubtaskInput
  ) => Observable<FetchResult<{ createSubtask: CreateSubtaskResponse }>>;
}

export const CREATE_SUBTASK_USECASE = new InjectionToken<ICreateSubtaskUsecase>(
  'CreateSubtaskUsecase'
);

export type CreateSubtaskResponse = Pick<
  Subtask,
  'id' | 'title' | 'description' | 'scheduledTimeSec'
> & {
  assign?: Pick<User, 'id'> & { __typename: 'User' };
  task: Pick<Task, 'id'> & { __typename: 'Task' };
  __typename: 'Subtask';
};
