import { Project } from './project';
import { User } from './user';

export type Authority = {
  id: string;
  name: string;
  project: Project;
  user: User;
};
