import { User } from './user';

export type Comment = {
  id: string;
  content: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
};
