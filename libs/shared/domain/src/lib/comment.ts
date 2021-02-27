import { User } from './user';
import { createId } from './utils/create-id';
import { getNow } from './utils/get-now';

export type Comment = {
  id: string;
  content: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
};

export const createComment = (
  content: Comment['content'],
  createdBy: Comment['createdBy']
): Comment => ({
  id: createId(),
  content,
  createdBy,
  createdAt: getNow(),
  updatedAt: getNow(),
});
