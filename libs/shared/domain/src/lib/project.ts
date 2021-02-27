import { Backlog, createBacklog } from './backlog';
import { Board } from './board';
import { Color } from './color';
import { User } from './user';
import { createId } from './utils/create-id';

export type Project = {
  id: string;
  name: string;
  description?: string;
  color: Color;
  boards: Board[];
  backlog: Backlog;
  members: User[];
  admin: User;
};

export const createProject = (
  name: Project['name'],
  admin: Project['admin'],
  members: Project['members'] = [],
  color: Project['color'] = 'gray',
  description?: Project['description']
): Project => {
  const id = createId();
  return {
    id,
    name,
    description,
    color,
    boards: [],
    backlog: createBacklog(id),
    members,
    admin,
  };
};
