import { User } from '@bison/shared/domain';

export interface IListUsersService {
  handle: () => Promise<{ users: User[] }>;
}

export const LIST_USERS_SERVICE = Symbol('ListUsersService');
