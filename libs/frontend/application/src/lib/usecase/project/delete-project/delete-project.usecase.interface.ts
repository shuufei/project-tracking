import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { DeleteProjectInput, Project } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IDeleteProjectUsecase {
  execute: (
    input: DeleteProjectInput
  ) => Observable<FetchResult<{ deleteProject: DeleteProjectResponse }>>;
}

export const DELETE_PROJECT_USECASE = new InjectionToken<IDeleteProjectUsecase>(
  'DeleteProjectUsecase'
);

export type DeleteProjectResponse = Pick<Project, 'id'> & {
  __typename: 'Project';
};
