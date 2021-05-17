import { Project, User } from '@bison/shared/domain';

export interface IListProjectsByUserIdService {
  handle: (userId: User['id']) => Promise<ListProjectsByUserIdResponse>;
}
export const LIST_PROJECTS_BY_USER_ID_SERVICE = Symbol(
  'ListProjectsByUserIdService'
);

export type ListProjectsByUserIdResponse = {
  projects: Project[];
};
