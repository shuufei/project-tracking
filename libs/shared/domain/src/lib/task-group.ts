import { Board } from './board';
import { createId, Id } from './id';
import { Status } from './status';
import { User } from './user';

export type TaskGroup = {
  id: Id;
  title: string;
  description?: string;
  status: Status;
  assignUserId?: User['id'];
  boardId: Board['id'];
  scheduledTimeSec?: number;
};

export const createTaskGroup = (
  title: TaskGroup['title'],
  assignUserId: TaskGroup['assignUserId'],
  boardId: TaskGroup['boardId'],
  description?: TaskGroup['description'],
  scheduledTimeSec?: TaskGroup['scheduledTimeSec']
): TaskGroup => ({
  id: createId(),
  title,
  description,
  status: 'TODO',
  assignUserId,
  boardId,
  scheduledTimeSec,
});
