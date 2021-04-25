import { Cursor, ProjectEdge } from '@bison/backend/domain';
import { User } from '@bison/shared/domain';

export interface IListProjectsByUserIdService {
  handle: (
    userId: User['id'],
    first: number,
    after?: Cursor
  ) => Promise<ListProjectsByUserIdResponse>;
}
export const LIST_PROJECTS_BY_USER_ID_SERVICE = Symbol(
  'ListProjectsByUserIdService'
);

export type ListProjectsByUserIdResponse = {
  edges: ProjectEdge[];
  hasNextPage: boolean;
};
