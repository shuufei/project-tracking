import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { DeleteProjectInput, Project } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface IDeleteProjectUsecase {
  execute: (
    input: DeleteProjectInput,
    fragment: Fragment
  ) => Observable<FetchResult<{ deleteProject: Project }>>;
}

export const DELETE_PROJECT_USECASE = new InjectionToken<IDeleteProjectUsecase>(
  'DeleteProjectUsecase'
);
