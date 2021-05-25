import { Board, TaskGroup } from '@bison/shared/domain';
export interface ITaskGroupRepository {
  listByBoardId: (boardId: Board['id']) => Promise<{ taskGroups: TaskGroup[] }>;
}

export const TASK_GROUP_REPOSITORY = Symbol('TaskGroupRepository');
