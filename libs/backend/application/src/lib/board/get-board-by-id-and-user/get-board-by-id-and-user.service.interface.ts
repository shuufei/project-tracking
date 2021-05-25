import { Board, User } from '@bison/shared/domain';

export interface IGetBoardByIdAndUserService {
  handle: (id: Board['id'], requestUser: User) => Promise<Board>;
}

export const GET_BOARD_BY_ID_AND_USER_SERVICE = Symbol(
  'IGetBoardByIdAndUserService'
);
