import { TaskGroup, User } from '@bison/shared/domain';

export interface ICreateTaskGroupService {
  handle: (
    input: CreateTaskGroupServiceInput,
    requestUser: User
  ) => Promise<TaskGroup>;
}

export type CreateTaskGroupServiceInput = Pick<
  TaskGroup,
  'title' | 'description' | 'assignUserId' | 'boardId' | 'scheduledTimeSec'
>;

export const CREATE_TASK_GROUP_SERVICE = Symbol('CreateTaskGroupService');
