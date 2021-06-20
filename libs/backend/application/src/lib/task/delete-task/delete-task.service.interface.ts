import { Task, User } from '@bison/shared/domain';

export interface IDeleteTaskService {
  handle: (id: Task['id'], requestUser: User) => Promise<Task>;
}

export const DELETE_TASK_SERVICE = Symbol('DeleteTaskService');
