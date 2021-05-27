import { Subtask, Task } from '@bison/shared/domain';

export interface ISubtaskRepository {
  listByTaskId: (taskId: Task['id']) => Promise<{ subtasks: Subtask[] }>;
}

export const SUBTASK_REPOSITORY = Symbol('SubtaskRepository');
