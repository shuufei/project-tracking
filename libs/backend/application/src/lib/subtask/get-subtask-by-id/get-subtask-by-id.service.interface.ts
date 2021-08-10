import { Subtask } from '@bison/shared/domain';

export interface IGetSubtaskByIdService {
  handle: (subtaskId: Subtask['id']) => Promise<Subtask>;
}

export const GET_SUBTASK_BY_ID_SERVICE = Symbol('GetSubtaskByIdService');
