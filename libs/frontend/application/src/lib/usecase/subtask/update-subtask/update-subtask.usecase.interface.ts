import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Subtask, UpdateSubtaskInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateSubtaskUsecase {
  execute: (
    input: UpdateSubtaskInput
  ) => Observable<FetchResult<{ updateSubtask: Subtask }>>;
}

export const UPDATE_SUBTASK_USECASE = new InjectionToken<IUpdateSubtaskUsecase>(
  'UpdateSubtaskUsecase'
);
