import { Cursor } from '@bison/backend/domain';
import { Project, User } from '@bison/shared/domain';

export interface IListMembersService {
  handle: (
    projectId: Project['id'],
    first: number,
    after?: Cursor
  ) => Promise<ListMembersResponse>;
}

export const LIST_MEMBERS_SERVICE = Symbol('ListMembersService');

export type UserNode = Pick<User, 'id' | 'name' | 'icon'>;

export type UserEdge = {
  node: UserNode;
  cursor: Cursor;
};

export type ListMembersResponse = {
  edges: UserEdge[];
  hasNextPage: boolean;
};
