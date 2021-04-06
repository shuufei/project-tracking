import { Project } from '@bison/shared/domain';

export interface IProjectRepository {
  getById: (id: ProjectNode['id']) => Promise<GetResponse>;
  list: (count: number, cursor?: ProjectNode['id']) => Promise<ListResponse>;
}

export type ProjectNode = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
>;

export type ProjectEdge = {
  node: ProjectNode;
  cursor: string;
};

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');

export type GetResponse = {
  node: ProjectNode;
};

export type ListResponse = {
  edges: ProjectEdge[];
};
