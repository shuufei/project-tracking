import { Subtask, User } from '@bison/shared/domain';

export interface ICreateSubtaskService {
  handle: (
    input: CreateSubtaskServiceInput,
    requestUser: User
  ) => Promise<Subtask>;
}

export type CreateSubtaskServiceInput = Pick<
  Subtask,
  'title' | 'description' | 'assignUserId' | 'taskId' | 'scheduledTimeSec'
>;

export const CREATE_SUBTASK_SERVICE = Symbol('CreateSubtaskService');
