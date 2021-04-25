import { Project } from './project';
import { createId } from './utils/create-id';

export type User = {
  id: string;
  name: string;
  icon?: string;
  projectIds: Project['id'][];
};

export const createUser = (
  name: User['name'],
  projectIds: User['projectIds'] = [],
  icon?: User['icon']
): User => ({
  id: createId(),
  name,
  icon,
  projectIds,
});
