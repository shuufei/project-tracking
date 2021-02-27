import { Subtask } from './subtask';
import { TrackingLog } from './tracking-log';

export type TrackingSubtask = Subtask & {
  trackingLogs: TrackingLog[];
};
