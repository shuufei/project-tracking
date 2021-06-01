import { Task } from '@bison/shared/domain';

export interface IGetTaskByIdService {
  handle: (taskId: Task['id']) => Promise<Task>;
}

export const GET_TASK_BY_ID_SERVICE = Symbol('GetTaskByIdService');
