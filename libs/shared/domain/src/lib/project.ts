import { Color, COLOR } from './color';
import { createId, Id } from './id';
import { User } from './user';

export type Project = {
  id: Id;
  name: string;
  description?: string;
  color: Color;
  adminUserId: User['id'];
};

export const createProject = (
  name: Project['name'],
  adminUserId: Project['adminUserId'],
  color: Project['color'] = COLOR.Gray,
  description?: Project['description']
): Project => {
  const id = createId();
  return {
    id,
    name,
    description,
    color,
    adminUserId,
  };
};
