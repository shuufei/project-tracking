import { Project, User } from '@bison/shared/domain';

export interface IDeleteProjectService {
  handle: (id: Project['id'], requestUser: User) => Promise<Project>;
}

export const DELETE_PROJECT_SERVICE = Symbol('DeleteProjectService');
