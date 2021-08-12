import {
  Board,
  TaskGroup as DomainTaskGroup,
  User,
} from '@bison/shared/domain';

export type TaskGroup = Pick<
  DomainTaskGroup,
  'id' | 'title' | 'description' | 'scheduledTimeSec' | 'status' | 'tasksOrder'
> & {
  board: Pick<Board, 'id' | 'name' | 'projectId' | 'description'>;
  assign?: User;
};

export const isTaskGroup = (value: TaskGroup | unknown): value is TaskGroup => {
  return (
    (value as TaskGroup).title != null &&
    (value as TaskGroup).tasksOrder != null
  );
};
