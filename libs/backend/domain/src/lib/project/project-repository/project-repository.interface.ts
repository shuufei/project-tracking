import type { Project, User } from '@bison/shared/domain';

export interface IProjectRepository {
  getById: (id: Project['id']) => Promise<Project>;
  list: () => Promise<ListProjectsResponse>;
  listByUserId: (userId: User['id']) => Promise<ListProjectsResponse>;
  create: (project: Project) => Promise<Project>;
  update: (project: Project) => Promise<Project>;
  delete: (id: Project['id']) => Promise<Project>;
  addMembers: (id: Project['id'], userIds: User['id'][]) => Promise<void>;
  removeMembers: (id: Project['id'], userIds: User['id'][]) => Promise<void>;
}

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');

export type ListProjectsResponse = {
  projects: Project[];
};
