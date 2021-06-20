import { Subtask, User } from '@bison/shared/domain';

export interface IDeleteSubtaskService {
  handle: (id: Subtask['id'], requestUser: User) => Promise<Subtask>;
}

export const DELETE_SUBTASK_SERVICE = Symbol('DeleteSubtaskService');
