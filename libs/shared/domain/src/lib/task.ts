import { Board } from './board';
import { Comment } from './comment';
import { Project } from './project';
import { Status } from './status';
import { Subtask } from './subtask';
import { User } from './user';
import { createId } from './utils/create-id';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdBy: User['id'];
  subtasks: Subtask[];
  assign: User[];
  comments: Comment[];
  projectId?: Project['id'];
  boardId?: Board['id'];
};

export const createTask = (
  title: Task['title'],
  createdBy: Task['createdBy'],
  assign: Task['assign'] = [],
  description?: Task['description'],
  projectId?: Task['projectId'],
  boardId?: Task['boardId']
): Task => ({
  id: createId(),
  title,
  description,
  status: 'TODO',
  createdBy,
  subtasks: [],
  assign,
  comments: [],
  projectId,
  boardId,
});
