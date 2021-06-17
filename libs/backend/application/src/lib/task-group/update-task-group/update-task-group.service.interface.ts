import { TaskGroup, User } from '@bison/shared/domain';

export interface IUpdateTaskGroupService {
  handle: (taskGroup: TaskGroup, requestUser: User) => Promise<TaskGroup>;
}

export const UPDATE_TASK_GROUP_SERVICE = Symbol('UpdateTaskGroupService');
