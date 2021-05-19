import { Project, User } from '@bison/shared/domain';

export interface IGetAdminService {
  handle: (projectId: Project['id']) => Promise<GetAdminResponse>;
}

export const GET_ADMIN_SERVICE = Symbol('GetAdminService');

export type GetAdminResponse = User;
