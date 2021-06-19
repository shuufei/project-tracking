import { Board, User } from '@bison/shared/domain';
export interface IUpdateBoardService {
  handle: (board: Board, requestUser: User) => Promise<Board>;
}

export const UPDATE_BOARD_SERVICE = Symbol('UpdateBoardService');
