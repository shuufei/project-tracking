import { Project, User } from '@bison/shared/domain';

export interface IUserRepository {
  getByIdpUserId: (idpUserId: string) => Promise<User>;
  getById: (id: User['id']) => Promise<User>;
  listByProjectId: (projectId: Project['id']) => Promise<ListUsersResponse>;
  list: () => Promise<ListUsersResponse>;
}

export const USER_REPOSITORY = Symbol('UserRepository');

export type ListUsersResponse = {
  users: User[];
};
