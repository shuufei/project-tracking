import { Board, TaskGroup } from '@bison/shared/domain';
export interface ITaskGroupRepository {
  listByBoardId: (boardId: Board['id']) => Promise<{ taskGroups: TaskGroup[] }>;
  getById: (id: TaskGroup['id']) => Promise<TaskGroup>;
  create: (taskGroup: TaskGroup) => Promise<TaskGroup>;
  update: (taskGroup: TaskGroup) => Promise<TaskGroup>;
  delete: (id: TaskGroup['id']) => Promise<void>;
}

export const TASK_GROUP_REPOSITORY = Symbol('TaskGroupRepository');
