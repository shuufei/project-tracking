import {
  Board,
  Project,
  Task as DomainTask,
  TaskGroup,
  User,
} from '@bison/shared/domain';
import { Subtask } from '../subtask';

export type Task = Pick<
  DomainTask,
  | 'id'
  | 'title'
  | 'description'
  | 'status'
  | 'workTimeSec'
  | 'scheduledTimeSec'
  | 'subtasksOrder'
  | 'workStartDateTimestamp'
  | 'createdAt'
> & {
  board: Pick<Board, 'id'> & {
    project: Pick<Project, 'id'>;
  };
  assignUser?: User;
  taskGroup?: Pick<TaskGroup, 'id' | 'title'>;
  subtasks: Subtask[];
};

export const isTask = (value: Task | unknown): value is Task => {
  return (
    (value as Task).subtasks != null &&
    (value as Task).title != null &&
    (value as Task).subtasksOrder != null
  );
};
