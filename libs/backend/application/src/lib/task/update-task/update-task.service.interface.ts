import { Task, User } from '@bison/shared/domain';

export interface IUpdateTaskService {
  handle: (task: Task, requestUser: User) => Promise<Task>;
}

export const UPDATE_TASK_SERVICE = Symbol('UpdateTaskService');
