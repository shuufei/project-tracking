import {
  Board,
  TaskGroup,
  TaskGroupWithoutCreatedAt,
} from '@bison/shared/domain';
export interface ITaskGroupRepository {
  listByBoardId: (boardId: Board['id']) => Promise<{ taskGroups: TaskGroup[] }>;
  getById: (id: TaskGroup['id']) => Promise<TaskGroup>;
  create: (taskGroup: TaskGroup) => Promise<TaskGroup>;
  update: (taskGroup: TaskGroupWithoutCreatedAt) => Promise<TaskGroup>;
  delete: (id: TaskGroup['id']) => Promise<void>;
}

export const TASK_GROUP_REPOSITORY = Symbol('TaskGroupRepository');
