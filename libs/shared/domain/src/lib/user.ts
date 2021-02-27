import { Project } from './project';
import { createId } from './utils/create-id';

export type User = {
  id: string;
  name: string;
  icon?: string;
  projects: Project[];
};

export const createUser = (
  name: User['name'],
  projects: User['projects'] = [],
  icon?: User['icon']
): User => ({
  id: createId(),
  name,
  icon,
  projects,
});
