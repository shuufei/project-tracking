import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { DeleteTaskInput, Task } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IDeleteTaskUsecase {
  execute: (
    input: DeleteTaskInput
  ) => Observable<FetchResult<{ deleteTask: DeleteTaskResponse }>>;
}

export const DELETE_TASK_USECASE = new InjectionToken<IDeleteTaskUsecase>(
  'DeleteTaskUsecase'
);

export type DeleteTaskResponse = Pick<Task, 'id'> & { __typename: 'Task' };
