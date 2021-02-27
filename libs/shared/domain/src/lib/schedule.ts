import { Task } from './task';
import { User } from './user';
import { createId } from './utils/create-id';

export type Schedule = {
  id: string;
  userId: User['id'];
  tasks: Task[];
  date: Date;
};

export const createSchedule = (
  userId: Schedule['userId'],
  date: Schedule['date'],
  tasks: Schedule['tasks'] = []
): Schedule => ({
  id: createId(),
  userId,
  tasks,
  date,
});
