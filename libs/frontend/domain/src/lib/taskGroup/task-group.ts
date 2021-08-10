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
