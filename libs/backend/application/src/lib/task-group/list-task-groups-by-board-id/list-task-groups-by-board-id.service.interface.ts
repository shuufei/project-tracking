import { Board, TaskGroup } from '@bison/shared/domain';

export interface IListTaskGroupsByBoardIdService {
  handle: (boardId: Board['id']) => Promise<{ taskGroups: TaskGroup[] }>;
}

export const LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE = Symbol(
  'ListTaskGroupsByBoardIdService'
);
