import { Project } from './project';
import { User } from './user';
import { createId } from './utils/create-id';

export type Authority = {
  id: string;
  name: string;
  projectId: Project['id'];
  userId: User['id'];
};

export const createAuthority = (
  name: Authority['id'],
  projectId: Authority['projectId'],
  userId: Authority['userId']
): Authority => ({
  id: createId(),
  name,
  projectId,
  userId,
});
