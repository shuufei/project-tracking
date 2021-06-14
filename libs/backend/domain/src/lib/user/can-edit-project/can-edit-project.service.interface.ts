import { Project, User } from '@bison/shared/domain';

export interface ICanEditProjectService {
  handle: (userId: User['id'], projectId: Project['id']) => Promise<boolean>;
}

export const CAN_EDIT_PROJECT_SERVICE = Symbol('CanEditProjectService');
