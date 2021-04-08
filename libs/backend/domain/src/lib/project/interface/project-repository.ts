import { Project } from '@bison/shared/domain';

export interface IProjectRepository {
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

export type ListResponse = {
  edges: ProjectEdge[];
};
