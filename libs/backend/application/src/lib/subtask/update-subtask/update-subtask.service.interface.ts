import { Subtask, User } from '@bison/shared/domain';

export interface IUpdateSubtaskService {
  handle: (subtask: Subtask, requestUser: User) => Promise<Subtask>;
}

export const UPDATE_SUBTASK_SERVICE = Symbol('UpdateSubtaskService');
