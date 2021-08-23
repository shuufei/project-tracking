import {
  Board,
  TaskGroup as DomainTaskGroup,
  User,
} from '@bison/shared/domain';
import { Task } from '../task/task';

export type TaskGroup = Pick<
  DomainTaskGroup,
  'id' | 'title' | 'description' | 'scheduledTimeSec' | 'status' | 'tasksOrder'
> & {
  board: Pick<Board, 'id' | 'name' | 'projectId' | 'description'>;
  assignUser?: User;
  tasks: Task[];
};

export const isTaskGroup = (value: TaskGroup | unknown): value is TaskGroup => {
  return (
    (value as TaskGroup).title != null &&
    (value as TaskGroup).tasksOrder != null
  );
};
