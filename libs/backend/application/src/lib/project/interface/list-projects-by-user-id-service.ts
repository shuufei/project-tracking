import { ProjectEdge } from '@bison/backend/domain';
import { Project, User } from '@bison/shared/domain';

export interface IListProjectsByUserIdService {
  handle: (
    userId: User['id'],
    first: number,
    after?: Project['id']
  ) => Promise<ListProjectsByUserIdResponse>;
}
export const LIST_PROJECTS_BY_USER_ID_SERVICE = Symbol(
  'ListProjectsByUserIdService'
);

export type ListProjectsByUserIdResponse = {
  edges: ProjectEdge[];
  hasNextPage: boolean;
};
