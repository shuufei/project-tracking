import { Task } from './task';
import { TrackingLog } from './tracking-log';
import { TrackingSubtask } from './tracking-subtask';

export type TrackingTask = Task & {
  trackingLogs: TrackingLog[];
  subtasks: TrackingSubtask[];
};
