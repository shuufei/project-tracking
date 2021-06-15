import { Project, User } from '@bison/shared/domain';

export interface IUpdateMembersService {
  handle: (
    input: UpdateMembersServiceInput,
    requestUser: User
  ) => Promise<Project>;
}

export const UPDATE_MEMBERS_SERVICE = Symbol('UpdateMembersService');

export type UpdateMembersServiceInput = {
  projectId: Project['id'];
  addUserIds: User['id'][];
  removeUserIds: User['id'][];
};
