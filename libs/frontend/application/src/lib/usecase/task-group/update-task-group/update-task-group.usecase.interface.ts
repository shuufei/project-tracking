import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { TaskGroup, UpdateTaskGroupInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateTaskGroupUsecase {
  execute: (
    input: UpdateTaskGroupInput
  ) => Observable<FetchResult<{ updateTaskGroup: TaskGroup }>>;
}

export const UPDATE_TASK_GROUP_USECASE = new InjectionToken<IUpdateTaskGroupUsecase>(
  'UpdateTaskGroupUsecase'
);
