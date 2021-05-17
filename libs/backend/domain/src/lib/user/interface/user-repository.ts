import { User } from '@bison/shared/domain';

export interface IUserRepositoy {
  getByIdpUserId: (idpUserId: string) => Promise<User>;
  getById: (id: User['id']) => Promise<User>;
}

export const USER_REPOSITORY = Symbol('UserRepository');
