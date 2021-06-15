import { Project, User } from '@bison/shared/domain';

export interface IUpdatePrjojectService {
  handle: (project: Project, requestUser: User) => Promise<Project>;
}

export const UPDATE_PROJECT_SERVICE = Symbol('UpdateProjectService');
