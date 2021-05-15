import { createId, Id } from './id';
import { User } from './user';

export type Subtask = {
  id: Id;
  title: string;
  description?: string;
  isDone: boolean;
  assignUserId?: User['id'];
  workTimeSec: number;
  scheduledTimeSec?: number;
};

export const createSubtask = (
  title: Subtask['title'],
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
});
