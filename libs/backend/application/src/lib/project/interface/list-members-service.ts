import { Project, User as DomainUser } from '@bison/shared/domain';

export interface IListMembersService {
  handle: (projectId: Project['id']) => Promise<ListMembersResponse>;
}

export const LIST_MEMBERS_SERVICE = Symbol('ListMembersService');

export type User = Pick<DomainUser, 'id' | 'name' | 'icon'>;

export type ListMembersResponse = {
  users: User[];
};
