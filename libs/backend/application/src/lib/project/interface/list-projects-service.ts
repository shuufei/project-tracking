import { ListResponse } from '@bison/backend/domain';

export interface IListProjectsService {
  handle: () => Promise<ListProjectsResponse>;
}
export const LIST_PROJECTS_SERVICE = Symbol('ListProjectsService');

export type ListProjectsResponse = ListResponse;
