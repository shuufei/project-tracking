import { Board, Project, User } from '@bison/shared/domain';

export interface IListUsersByProjectIdService {
  handle: (
    projectId: Project['id'],
    first: number,
    after?: Board['id']
  ) => Promise<ListUsersByProjectIdResponse>;
}

export const LIST_USERS_BY_PROJECT_ID_SERVICE = Symbol(
  'ListUsersByProjectIdService'
);

export type UserNode = Pick<User, 'id' | 'name' | 'icon'>;

export type UserEdge = {
  node: UserNode;
  cursor: string;
};

export type ListUsersByProjectIdResponse = {
  edges: UserEdge[];
  hasNextPage: boolean;
};
