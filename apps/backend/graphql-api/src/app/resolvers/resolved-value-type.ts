import { Board, Project, Task, TaskGroup, User } from '@bison/shared/schema';

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

export type ResolvedUser = Pick<User, 'id' | 'name' | 'icon'>;

export type ResolvedProject = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
> & {
  admin: Pick<Project['admin'], 'id'>;
};

export type ResolvedTask = Pick<
  Task,
  | 'id'
  | 'title'
  | 'description'
  | 'status'
  | 'workTimeSec'
  | 'scheduledTimeSec'
  | 'subtasksOrder'
> & {
  assign?: Pick<User, 'id'>;
  board: Pick<Task['board'], 'id'>;
  taskGroup?: Pick<TaskGroup, 'id'>;
};
