import { Id, User } from '@bison/shared/domain';

export interface IGetUserByIdService {
  handle: (id: Id) => Promise<User>;
}

export const GET_USER_BY_ID_SERVICE = Symbol('GetUserByIdService');
