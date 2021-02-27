import { LapTime } from './lap-time';
import { Subtask } from './subtask';
import { Task } from './task';
import { User } from './user';
import { createId } from './utils/create-id';

type Common = {
  id: string;
  lapTimes: LapTime[];
  plannedTimeSec?: number;
  userId: User['id'];
};

export type TaskTrackingLog = Common & {
  taskId: Task['id'];
};

export type SubtaskTrackingLog = Common & {
  subtaskId: Subtask['id'];
};

export type TrackingLog = TaskTrackingLog | SubtaskTrackingLog;

export const createTaskTrackingLog = (
  taskId: TaskTrackingLog['taskId'],
  userId: TaskTrackingLog['userId'],
  plannedTimeSec?: TrackingLog['plannedTimeSec']
): TrackingLog => ({
  id: createId(),
  lapTimes: [],
  plannedTimeSec,
  taskId,
  userId,
});

export const createSubtaskTrackingLog = (
  subtaskId: SubtaskTrackingLog['subtaskId'],
  userId: TaskTrackingLog['userId'],
  plannedTimeSec?: TrackingLog['plannedTimeSec']
): TrackingLog => ({
  id: createId(),
  lapTimes: [],
  plannedTimeSec,
  subtaskId,
  userId,
});
