import { Cursor, ProjectEdge } from '@bison/backend/domain';

export interface IListProjectsService {
  handle: (first: number, after?: Cursor) => Promise<ListProjectsResponse>;
}
export const LIST_PROJECTS_SERVICE = Symbol('ListProjectsService');

export type ListProjectsResponse = {
  edges: ProjectEdge[];
  hasNextPage: boolean;
};
