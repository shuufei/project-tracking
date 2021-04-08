import { ProjectEdge } from '@bison/backend/domain';
import { Project } from '@bison/shared/domain';

export interface IListProjectsService {
  handle: (first: number, after?: Project['id']) => ListProjectsResponse;
}
export const LIST_PROJECTS_SERVICE = Symbol('ListProjectsService');

export type ListProjectsResponse = Promise<{
  edges: ProjectEdge[];
  hasNextPage: boolean;
}>;
