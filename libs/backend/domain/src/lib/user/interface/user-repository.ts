import { Project, User } from '@bison/shared/domain';

export interface IUserRepositoy {
  getByIdpUserId: (idpUserId: string) => Promise<User>;
  getById: (id: User['id']) => Promise<User>;
  listUsersByProjectId: (
    projectId: Project['id']
  ) => Promise<ListUsersResponse>;
}

export const USER_REPOSITORY = Symbol('UserRepository');

export type ListUsersResponse = {
  users: User[];
};
