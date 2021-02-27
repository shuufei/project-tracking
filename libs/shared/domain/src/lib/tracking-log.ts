import { LapTime } from './lap-time';
import { Task } from './task';
import { User } from './user';

export type TrackingLog = {
  id: string;
  lapTimes: LapTime[];
  plannedTimeSec: number;
  task: Task;
  user: User;
};
