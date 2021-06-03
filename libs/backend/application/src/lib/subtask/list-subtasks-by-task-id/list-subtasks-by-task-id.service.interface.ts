import { Subtask, Task } from '@bison/shared/domain';

export interface IListSubtasksByTaskIdService {
  handle: (taskId: Task['id']) => Promise<{ subtasks: Subtask[] }>;
}

export const LIST_SUBTASKS_BY_TASK_ID_SERVICE = Symbol(
  'ListSubtasksByTaskIdService'
);
