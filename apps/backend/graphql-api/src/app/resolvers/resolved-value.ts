import { Board, TaskGroup, User } from '@bison/shared/schema';

export type ResolvedBoard = Pick<
  Board,
  'id' | 'name' | 'description' | 'tasksOrder'
> & {
  project: Pick<Board['project'], 'id'>;
};

export type ResolvedTaskGroup = Pick<
  TaskGroup,
  'id' | 'title' | 'description' | 'status' | 'scheduledTimeSec' | 'tasksOrder'
> & {
  assign?: Pick<User, 'id'>;
  board: Pick<TaskGroup['board'], 'id'>;
};
