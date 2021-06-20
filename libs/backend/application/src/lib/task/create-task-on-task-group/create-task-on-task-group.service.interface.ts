import { Task, User } from '@bison/shared/domain';

export interface ICreateTaskOnTaskGroupService {
  handle: (
    input: CreateTaskOnTaskGroupServiceInput,
    requestUser: User
  ) => Promise<Task>;
}

export const CREATE_TASK_ON_TASK_GROUP_SERVICE = Symbol(
  'CreateTaskOnTaskGroupService'
);

export type CreateTaskOnTaskGroupServiceInput = Pick<
  Task,
  'title' | 'description' | 'assignUserId'
> &
  Required<Pick<Task, 'taskGroupId'>>;
