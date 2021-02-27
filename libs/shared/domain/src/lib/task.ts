import { Board } from './board';
import { Comment } from './comment';
import { Project } from './project';
import { Status } from './status';
import { Subtask } from './subtask';
import { User } from './user';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdBy: User;
  subtasks: Subtask[];
  assign: User[];
  comments: Comment[];
  project?: Project;
  bord?: Board;
};
