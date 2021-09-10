import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Project, UpdateProjectInput, User } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateProjectUsecase {
  execute: (
    input: UpdateProjectInput
  ) => Observable<FetchResult<{ updateProject: UpdateProjectResponse }>>;
}

export const UPDATE_PROJECT_USECASE = new InjectionToken<IUpdateProjectUsecase>(
  'UpdateProjectUsecase'
);

export type UpdateProjectResponse = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
> & {
  __typename: 'Project';
  admin: Pick<User, 'id'> & {
    __typename: 'User';
  };
};
