import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Project, UpdateProjectMembersInput, User } from '@bison/shared/schema';
import { Observable } from 'rxjs';

export interface IUpdateProjectMembersUsecase {
  execute: (
    input: UpdateProjectMembersInput
  ) => Observable<
    FetchResult<{ updateProjectMembers: UpdateProjectMembersResponse }>
  >;
}

export const UPDATE_PROJECT_MEMBERS_USECASE = new InjectionToken<IUpdateProjectMembersUsecase>(
  'UpdateProjectMembersUsecase'
);

export type UpdateProjectMembersResponse = Pick<Project, 'id'> & {
  __typename: 'Project';
  members: (Pick<User, 'id'> & {
    __typename: 'User';
  })[];
};
