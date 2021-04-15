import { Backlog, Project } from '@bison/shared/domain';

export interface IGetProjectByBacklogIdService {
  handle: (backlogId: Backlog['id']) => Promise<GetProjectByBacklogIdResponse>;
}

export const GET_PROJECT_BY_BACKLOG_ID_SERVICE = Symbol(
  'GetProjectByBacklogIdService'
);

export type GetProjectByBacklogIdResponse = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
>;
