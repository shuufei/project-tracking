import { Subtask as DomainSubtask, User } from '@bison/shared/domain';

export type Subtask = Pick<
  DomainSubtask,
  | 'id'
  | 'title'
  | 'description'
  | 'isDone'
  | 'taskId'
  | 'scheduledTimeSec'
  | 'workTimeSec'
> & {
  assignUser?: User;
};
