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
> & {
  board: Pick<Board, 'id' | 'name' | 'description'> & {
    project: Pick<Project, 'id' | 'name'>;
  };
  assignUser?: User;
  taskGroup?: Pick<TaskGroup, 'id' | 'title' | 'description'>;
  subtasks: Subtask[];
};
