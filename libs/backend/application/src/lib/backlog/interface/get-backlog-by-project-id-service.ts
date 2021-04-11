import { Backlog, Project } from '@bison/shared/domain';

export interface IGetBacklogByProjectIdService {
  handle: (projectId: Project['id']) => GetBacklogByProjectIdResponse;
}

export const GET_BACKLOG_BY_PROJECT_ID_SERVICE = Symbol(
  'GetBacklogByProjectIdService'
);

export type GetBacklogByProjectIdResponse = Promise<Pick<Backlog, 'id'>>;
