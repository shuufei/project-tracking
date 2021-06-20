import { Board, User } from '@bison/shared/domain';

export interface IDeleteBoardService {
  handle: (id: Board['id'], requestUser: User) => Promise<Board>;
}

export const DELETE_BOARD_SERVICE = Symbol('DeleteBoardService');
