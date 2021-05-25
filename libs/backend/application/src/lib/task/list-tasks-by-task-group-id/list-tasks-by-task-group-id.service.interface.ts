import { Task, TaskGroup } from '@bison/shared/domain';

export interface IListTasksByTaskGroupIdService {
  handle: (taskGroupId: TaskGroup['id']) => Promise<{ tasks: Task[] }>;
}

export const LIST_TASKS_BY_TASK_GROUP_ID_SERVICE = Symbol(
  'ListTasksByTaskGroupIdService'
);
