import { Project, User } from '@bison/shared/domain';

export interface ICanAccessProjectService {
  handle: (userId: User['id'], projectId: Project['id']) => Promise<boolean>;
}

export const CAN_ACCESS_PROJECT_SERVICE = Symbol('CanAccessProjectService');
