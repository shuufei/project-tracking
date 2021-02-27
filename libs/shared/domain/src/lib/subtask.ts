import { Comment } from './comment';
import { User } from './user';
import { createId } from './utils/create-id';

export type Subtask = {
  id: string;
  title: string;
  description?: string;
  isDone: boolean;
  createdBy: User['id'];
  assign: User[];
  comments: Comment[];
  completedAt?: Date;
};

export const createSubtask = (
  title: Subtask['title'],
  createdBy: Subtask['createdBy'],
  assign: Subtask['assign'] = [],
  description?: Subtask['description']
): Subtask => ({
  id: createId(),
  title,
  description,
  isDone: false,
  createdBy,
  assign,
  comments: [],
});
