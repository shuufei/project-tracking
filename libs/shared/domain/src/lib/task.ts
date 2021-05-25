import { Board } from './board';
import { createId, Id } from './id';
import { Status } from './status';
import { Subtask } from './subtask';
import { TaskGroup } from './task-group';
import { User } from './user';

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
  subtasksOrder: Subtask['id'][];
};

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
});
