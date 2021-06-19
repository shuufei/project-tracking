import { Board, User } from '@bison/shared/domain';

export interface ICreateBoardService {
  handle: (input: CreateBoardServiceInput, requestUser: User) => Promise<Board>;
}

export type CreateBoardServiceInput = Pick<
  Board,
  'name' | 'description' | 'projectId'
>;

export const CREATE_BOARD_SERVICE = Symbol('CreateBoardService');
