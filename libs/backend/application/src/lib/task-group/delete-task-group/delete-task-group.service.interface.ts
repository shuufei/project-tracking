import { TaskGroup } from '@bison/shared/domain';
export interface IDeleteTaskGroupService {
  handle: (id: TaskGroup['id']) => Promise<TaskGroup>;
}

export const DELETE_TASK_GROUP_SERVICE = Symbol('DeleteTaskGroupService');
