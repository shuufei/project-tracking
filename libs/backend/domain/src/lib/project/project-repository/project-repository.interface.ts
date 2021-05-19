import { Project, User } from '@bison/shared/domain';

export interface IProjectRepository {
  getById: (id: Project['id']) => Promise<Project>;
  list: () => Promise<ListProjectsResponse>;
  listByUserId: (userId: User['id']) => Promise<ListProjectsResponse>;
}

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');

export type ListProjectsResponse = {
  projects: Project[];
};
