import { Project, User } from '@bison/shared/domain';

export interface IGetProjectByIdAndUserService {
  handle: (projectId: Project['id'], requestUser: User) => Promise<Project>;
}

export const GET_PROJECT_BY_ID_AND_USER_SERVICE = Symbol(
  'GetProjectByIdAndUserService'
);
