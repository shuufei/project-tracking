import {
  Board,
  Task,
  TaskGroup,
  TaskWithoutCreatedAt,
} from '@bison/shared/domain';

export interface ITaskRepository {
  listByTaskGroupId: (
    taskGroupId: TaskGroup['id']
  ) => Promise<ListTasksResponse>;

  listSoloTasksByBoardId: (boardId: Board['id']) => Promise<ListTasksResponse>;

  getById: (id: Task['id']) => Promise<Task>;

  create: (task: Task) => Promise<Task>;

  delete: (id: Task['id']) => Promise<void>;

  update: (task: TaskWithoutCreatedAt) => Promise<Task>;
}

export const TASK_REPOSITORY = Symbol('TaskRepository');

export type ListTasksResponse = {
  tasks: Task[];
};
