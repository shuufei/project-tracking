import { Backlog, Project } from '@bison/shared/domain';

export interface IGetBacklogByProjectIdService {
  handle: (projectId: Project['id']) => GetBacklogResponse;
}

export const GET_BACKLOG_BY_PROJECT_ID_SERVICE = Symbol(
  'GetBacklogByProjectIdService'
);

export type GetBacklogResponse = Promise<Pick<Backlog, 'id'>>;
