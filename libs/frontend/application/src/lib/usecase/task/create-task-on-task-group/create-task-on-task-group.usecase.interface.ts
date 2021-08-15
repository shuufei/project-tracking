import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CreateTaskOnTaskGroupInput, Task } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface ICreateTaskOnTaskGroupUsecase {
  excute: (
    input: CreateTaskOnTaskGroupInput,
    fragment: Fragment
  ) => Observable<FetchResult<{ createTaskOnTaskGroup: Task }>>;
}

export const CREATE_TASK_ON_TASK_GROUP_USECASE = new InjectionToken<ICreateTaskOnTaskGroupUsecase>(
  'CreateTaskUsecaseOnTaskGroup'
);
