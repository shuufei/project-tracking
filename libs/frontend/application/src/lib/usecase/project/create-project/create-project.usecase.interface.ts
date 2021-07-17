import { InjectionToken } from '@angular/core';
import { DocumentNode, FetchResult } from '@apollo/client';
import { CreateProjectInput, Project } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateProjectUsecase {
  execute: (
    input: CreateProjectInput,
    fragment: { name: string; fields: DocumentNode }
  ) => Observable<FetchResult<{ createProject: Project }>>;
}

export const CREATE_PROJECT_USECASE = new InjectionToken<ICreateProjectUsecase>(
  'CreateProjectUsecase'
);
