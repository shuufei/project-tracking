import { Board } from './board';
import { createId, Id } from './id';
import { Status } from './status';
import { Task } from './task';
import { User } from './user';
import { getNow } from './utils/get-now';

export type TaskGroup = {
  id: Id;
  title: string;
  description?: string;
  status: Status;
  assignUserId?: User['id'];
  boardId: Board['id'];
  scheduledTimeSec?: number;
  tasksOrder: Task['id'][];
  craetedAt: number;
};

export type TaskGroupWithoutCreatedAt = Pick<
  TaskGroup,
  | 'id'
  | 'title'
  | 'description'
  | 'assignUserId'
  | 'boardId'
  | 'scheduledTimeSec'
  | 'status'
  | 'tasksOrder'
>;

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
  tasksOrder: [],
  craetedAt: getNow().valueOf(),
});
