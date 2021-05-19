import { User } from '@bison/shared/domain';

export interface IGetUserByIdpUserIdService {
  handle: (idpUserId: string) => Promise<User>;
}

export const GET_USER_BY_IDP_USER_ID = Symbol('GET_USER_BY_IDP_USER_ID');
