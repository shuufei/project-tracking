import { TaskGroup } from '@bison/shared/domain';

export interface IUpdateTaskGroupService {
  handle: (taskGroup: TaskGroup) => Promise<TaskGroup>;
}

export const UPDATE_TASK_GROUP_SERVICE = Symbol('UpdateTaskGroupService');
