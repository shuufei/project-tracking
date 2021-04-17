import { InjectionToken } from '@angular/core';
import { Project as DomainProject, User } from '@bison/shared/domain';
import { Observable } from 'rxjs';

export interface IProjectDataStore {
  projects$: () => Observable<Project[]>;
}

export const PROJECT_DATA_STOR = new InjectionToken<IProjectDataStore>(
  'ProjectDataStore'
);

export type Project = Pick<
  DomainProject,
  'id' | 'name' | 'description' | 'color'
> & {
  // admin: Pick<User, 'id' | 'name' | 'icon'>; // TODO
  members: Pick<User, 'id' | 'name' | 'icon'>[];
};
