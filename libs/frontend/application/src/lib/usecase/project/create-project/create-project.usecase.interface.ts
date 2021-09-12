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

export type CreateProjectResponse = Pick<Project, 'id' | 'name' | 'color'> & {
  // TODO: 再帰的に、optionalの項目をnullableにする型を定義する
  description: Project['description'] | null;
  __typename: 'Project';
  admin: Pick<User, 'id'> & {
    __typename: 'User';
  };
  members: never[];
  boards: never[];
};
