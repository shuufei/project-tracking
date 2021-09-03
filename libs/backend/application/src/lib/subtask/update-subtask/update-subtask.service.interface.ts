import { Subtask, SubtaskWithoutCreatedAt, User } from '@bison/shared/domain';

export interface IUpdateSubtaskService {
  handle: (
    subtask: SubtaskWithoutCreatedAt,
    requestUser: User
  ) => Promise<Subtask>;
}

export const UPDATE_SUBTASK_SERVICE = Symbol('UpdateSubtaskService');
