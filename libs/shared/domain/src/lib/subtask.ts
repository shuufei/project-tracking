import { Comment } from './comment';
import { User } from './user';

export type Subtask = {
  id: string;
  description?: string;
  isDone: boolean;
  createdBy: User;
  assign: User[];
  comments: Comment[];
  completedAt: Date;
};
