import { createId, Id } from './id';
import { Task } from './task';
import { User } from './user';
import { getNow } from './utils/get-now';

export type Subtask = {
  id: Id;
  title: string;
  description?: string;
  isDone: boolean;
  assignUserId?: User['id'];
  workTimeSec: number;
  scheduledTimeSec?: number;
  workStartDateTimestamp?: number;
  taskId: Id;
  createdAt: number;
};

export type SubtaskWithoutCreatedAt = Pick<
  Subtask,
  | 'id'
  | 'title'
  | 'description'
  | 'assignUserId'
  | 'isDone'
  | 'scheduledTimeSec'
  | 'taskId'
  | 'workStartDateTimestamp'
  | 'workTimeSec'
>;

export const createSubtask = (
  title: Subtask['title'],
  taskId: Task['id'],
  assignUserId?: Subtask['assignUserId'],
  description?: Subtask['description'],
  scheduledTimeSec?: Subtask['scheduledTimeSec']
): Subtask => ({
  id: createId(),
  title,
  description,
  isDone: false,
  assignUserId,
  workTimeSec: 0,
  scheduledTimeSec,
  taskId,
  createdAt: getNow().valueOf(),
});
