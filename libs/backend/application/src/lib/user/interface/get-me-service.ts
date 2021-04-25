import { User } from '@bison/shared/domain';

export interface IGetMeService {
  handle: () => Promise<GetMeResponse>;
}

export const GET_ME_SERVICE = Symbol('GetMeService');

export type GetMeResponse = Pick<User, 'id' | 'name' | 'icon'>;
