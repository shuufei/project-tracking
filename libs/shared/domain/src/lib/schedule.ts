import { Task } from './task';
import { User } from './user';

export type Schedule = {
  id: string;
  user: User;
  tasks: Task[];
  date: Date;
};
