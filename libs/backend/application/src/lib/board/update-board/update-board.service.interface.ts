import { Board, User } from '@bison/shared/domain';
export interface IUpdateBoardService {
  handle: (board: UpdateBoardServiceInput, requestUser: User) => Promise<Board>;
}

export const UPDATE_BOARD_SERVICE = Symbol('UpdateBoardService');

export type UpdateBoardServiceInput = Pick<
  Board,
  'id' | 'description' | 'name' | 'projectId' | 'tasksOrder'
>;
