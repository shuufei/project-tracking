import {
  Board,
  Project,
  Subtask,
  Task as DomainTask,
  TaskGroup,
  User,
} from '@bison/shared/domain';

export type Task = Pick<
  DomainTask,
  | 'id'
  | 'title'
  | 'description'
  | 'status'
  | 'workTimeSec'
  | 'scheduledTimeSec'
  | 'subtasksOrder'
> & {
  board: Pick<Board, 'id' | 'name' | 'description'> & {
    project: Pick<Project, 'id' | 'name'>;
  };
  assignUser?: User;
  taskGroup?: Pick<TaskGroup, 'id' | 'title' | 'description'>;
  subtasks: (Pick<
    Subtask,
    | 'id'
    | 'title'
    | 'description'
    | 'isDone'
    | 'scheduledTimeSec'
    | 'workTimeSec'
  > & { assignUser: User })[];
};
