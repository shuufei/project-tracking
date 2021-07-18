import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Project, UpdateProjectInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface IUpdateProjectUsecase {
  execute: (
    input: UpdateProjectInput,
    fragment: Fragment
  ) => Observable<FetchResult<{ updateProject: Project }>>;
}

export const UPDATE_PROJECT_USECASE = new InjectionToken<IUpdateProjectUsecase>(
  'UpdateProjectUsecase'
);
