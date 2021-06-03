import { Board, Task } from '@bison/shared/domain';
export interface IListSoloTasksByBoardIdService {
  handle: (boardId: Board['id']) => Promise<{ tasks: Task[] }>;
}

export const LIST_SOLO_TASKS_BY_BOARD_ID_SERVICE = Symbol(
  'ListSoloTasksByBoardIdService'
);
