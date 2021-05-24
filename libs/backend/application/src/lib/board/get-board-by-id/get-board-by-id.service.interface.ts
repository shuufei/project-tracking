import { Board } from '@bison/shared/domain';

export interface IGetBoardByIdService {
  handle: (id: Board['id']) => Promise<Board>;
}

export const GET_BOARD_BY_ID_SERVICE = Symbol('IGetBoardByIdService');
