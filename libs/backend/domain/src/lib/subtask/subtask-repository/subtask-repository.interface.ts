import { Subtask, Task } from '@bison/shared/domain';

export interface ISubtaskRepository {
  listByTaskId: (taskId: Task['id']) => Promise<{ subtasks: Subtask[] }>;
  getById: (subtaskId: Subtask['id']) => Promise<Subtask>;
  create: (subtask: Subtask) => Promise<Subtask>;
  update: (subtask: Subtask) => Promise<Subtask>;
  delete: (id: Subtask['id']) => Promise<void>;
}

export const SUBTASK_REPOSITORY = Symbol('SubtaskRepository');
