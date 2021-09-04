import { Task, TaskWithoutCreatedAt, User } from '@bison/shared/domain';

export interface IUpdateTaskService {
  handle: (task: TaskWithoutCreatedAt, requestUser: User) => Promise<Task>;
}

export const UPDATE_TASK_SERVICE = Symbol('UpdateTaskService');
