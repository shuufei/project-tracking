import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Task, UpdateTaskInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateTaskUsecase {
  execute: (
    input: UpdateTaskInput
  ) => Observable<FetchResult<{ updateTask: Task }>>;
}

export const UPDATE_TASK_USECASE = new InjectionToken<IUpdateTaskUsecase>(
  'UpdateTaskUsecase'
);
