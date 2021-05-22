import { Board, User } from '@bison/shared/domain';

export interface IGetBoardByIdServiceBoardByIdService {
  handle: (id: Board['id'], requestUser: User) => Promise<Board>;
}

export const GET_BOARD_BY_ID_SERVICE = Symbol('IGetBoardByIdService');
