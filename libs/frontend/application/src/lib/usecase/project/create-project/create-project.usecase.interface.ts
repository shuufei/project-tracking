import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CreateProjectInput, Project, User } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface ICreateProjectUsecase {
  execute: (
    input: CreateProjectInput
  ) => Observable<FetchResult<{ createProject: CreateProjectResponse }>>;
}

export const CREATE_PROJECT_USECASE = new InjectionToken<ICreateProjectUsecase>(
  'CreateProjectUsecase'
);

export type CreateProjectResponse = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
> & {
  __typename: 'Project';
  admin: Pick<User, 'id'> & {
    __typename: 'User';
  };
};
