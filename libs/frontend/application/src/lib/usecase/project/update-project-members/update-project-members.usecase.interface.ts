import { InjectionToken } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Project, UpdateProjectMembersInput } from '@bison/shared/schema';
import { Observable } from 'rxjs';
import { Fragment } from '../../../types';

export interface IUpdateProjectMembersUsecase {
  execute: (
    input: UpdateProjectMembersInput,
    fragment: Fragment
  ) => Observable<FetchResult<{ updateProjectMembers: Project }>>;
}

export const UPDATE_PROJECT_MEMBERS_USECASE = new InjectionToken<IUpdateProjectMembersUsecase>(
  'UpdateProjectMembersUsecase'
);
