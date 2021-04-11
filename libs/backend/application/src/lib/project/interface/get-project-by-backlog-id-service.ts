import { Backlog, Project } from '@bison/shared/domain';

export interface IGetProjectByBacklogIdService {
  handle: (backlogId: Backlog['id']) => GetProjectByBacklogIdResponse;
}

export const GET_PROJECT_BY_BACKLOG_ID_SERVICE = Symbol(
  'GetProjectByBacklogIdService'
);

export type GetProjectByBacklogIdResponse = Promise<
  Pick<Project, 'id' | 'name' | 'description' | 'color'>
>;
