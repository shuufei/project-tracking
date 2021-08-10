import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CreateSubtaskInput, Subtask } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface ICreateSubtaskUsecase {
  execute: (
    input: CreateSubtaskInput,
    fragment: Fragment
  ) => Observable<FetchResult<{ createSubtask: Subtask }>>;
}

export const CREATE_SUBTASK_USECASE = new InjectionToken<ICreateSubtaskUsecase>(
  'CreateSubtaskUsecase'
);
