import { Subtask as DomainSubtask, User } from '@bison/shared/domain';

export type Subtask = Pick<
  DomainSubtask,
  | 'id'
  | 'title'
  | 'description'
  | 'isDone'
  | 'scheduledTimeSec'
  | 'workTimeSec'
  | 'workStartDateTimestamp'
  | 'taskId'
> & {
  assignUser?: User;
};

export const isSubtask = (value: Subtask | unknown): value is Subtask => {
  return (value as Subtask).isDone != null;
};
