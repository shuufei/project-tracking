import { Backlog } from './backlog';
import { Board } from './board';
import { Color } from './color';
import { User } from './user';

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
