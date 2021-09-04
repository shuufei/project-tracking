import {
  TaskGroup,
  TaskGroupWithoutCreatedAt,
  User,
} from '@bison/shared/domain';

export interface IUpdateTaskGroupService {
  handle: (
    taskGroup: TaskGroupWithoutCreatedAt,
    requestUser: User
  ) => Promise<TaskGroup>;
}

export const UPDATE_TASK_GROUP_SERVICE = Symbol('UpdateTaskGroupService');
