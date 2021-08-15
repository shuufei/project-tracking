import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { DeleteTaskGroupInput, TaskGroup } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IDeleteTaskGroupUsecase {
  execute: (
    input: DeleteTaskGroupInput
  ) => Observable<FetchResult<{ deleteTaskGroup: TaskGroup }>>;
}

export const DELETE_TASK_GROUP_USECASE = new InjectionToken<IDeleteTaskGroupUsecase>(
  'DeleteTaskGroupUsecase'
);
