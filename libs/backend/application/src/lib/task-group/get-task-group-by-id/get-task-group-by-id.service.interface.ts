import { TaskGroup } from '@bison/shared/domain';

export interface IGetTaskGroupByIdService {
  handle: (id: TaskGroup['id']) => Promise<TaskGroup>;
}

export const GET_TASK_GROUP_BY_ID_SERVICE = Symbol('GetTaskGroupByIdService');
