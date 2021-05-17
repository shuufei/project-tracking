import { Project, User } from '@bison/shared/domain';

export interface IProjectRepository {
  getById: (id: Project['id']) => Promise<Project>;
  list: () => Promise<ListResponse>;
  listByUserId: (userId: User['id']) => Promise<ListResponse>;
}

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');

export type ListResponse = {
  projects: Project[];
};
