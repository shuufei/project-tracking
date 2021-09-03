import { Board } from './board';
import { createId, Id } from './id';
import { Status } from './status';
import { Subtask } from './subtask';
import { TaskGroup } from './task-group';
import { User } from './user';
import { getNow } from './utils/get-now';

export type Task = {
  id: Id;
  title: string;
  description?: string;
  status: Status;
  assignUserId?: User['id'];
  boardId: Board['id'];
  taskGroupId?: TaskGroup['id'];
  workTimeSec: number;
  scheduledTimeSec?: number;
  workStartDateTimestamp?: number;
  subtasksOrder: Subtask['id'][];
  createdAt: number;
};

export type TaskWithoutCreatedAt = Pick<
  Task,
  | 'id'
  | 'title'
  | 'description'
  | 'assignUserId'
  | 'boardId'
  | 'scheduledTimeSec'
  | 'status'
  | 'subtasksOrder'
  | 'taskGroupId'
  | 'workStartDateTimestamp'
  | 'workTimeSec'
>;

export const createTask = (
  title: Task['title'],
  assignUserId: Task['assignUserId'],
  boardId: Task['boardId'],
  description?: Task['description'],
  taskGroupId?: Task['taskGroupId'],
  scheduledTimeSec?: Task['scheduledTimeSec']
): Task => ({
  id: createId(),
  title,
  description,
  status: 'TODO',
  assignUserId,
  boardId,
  taskGroupId,
  workTimeSec: 0,
  scheduledTimeSec,
  subtasksOrder: [],
  createdAt: getNow().valueOf(),
});
