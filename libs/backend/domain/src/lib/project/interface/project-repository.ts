import { Project as DomainProject } from '@bison/shared/domain';

export interface IProjectRepository {
  list: () => Promise<ListResponse>;
}

export type Project = Pick<
  DomainProject,
  'id' | 'name' | 'description' | 'color'
>;

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');

export type ListResponse = {
  projects: Project[];
};
