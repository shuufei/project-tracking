import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { DeleteSubtaskInput, Subtask } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IDeleteSubtaskUsecase {
  execute: (
    input: DeleteSubtaskInput
  ) => Observable<FetchResult<{ deleteSubtask: DeleteSubtaskResponse }>>;
}

export const DELETE_SUBTASK_USECASE = new InjectionToken<IDeleteSubtaskUsecase>(
  'DeleteSubtaskUsecase'
);

export type DeleteSubtaskResponse = Pick<Subtask, 'id'> & {
  __typename: 'Subtask';
};
