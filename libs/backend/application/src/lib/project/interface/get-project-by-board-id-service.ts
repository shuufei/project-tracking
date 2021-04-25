import { Board, Project } from '@bison/shared/domain';

export interface IGetProjectByBoardIdService {
  handle: (boardId: Board['id']) => Promise<GetProjectByBoardIdResponse>;
}

export const GET_PROJECT_BY_BOARD_ID_SERVICE = Symbol(
  'GetProjectByBoardIdService'
);

export type GetProjectByBoardIdResponse = Pick<
  Project,
  'id' | 'name' | 'description' | 'color'
>;
