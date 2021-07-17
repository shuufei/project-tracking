import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CreateProjectInput, Project } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface ICreateProjectUsecase {
  execute: (
    input: CreateProjectInput,
    fragment: Fragment
  ) => Observable<FetchResult<{ createProject: Project }>>;
}

export const CREATE_PROJECT_USECASE = new InjectionToken<ICreateProjectUsecase>(
  'CreateProjectUsecase'
);
