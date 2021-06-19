import { Board, Project } from '@bison/shared/domain';

export interface IBoardRepository {
  listByProjectId: (projectId: Project['id']) => Promise<ListBoardsResponse>;
  getById: (id: Board['id']) => Promise<Board>;
  create: (board: Board) => Promise<Board>;
  delete: (id: Board['id']) => Promise<void>;
  update: (board: Board) => Promise<Board>;
}

export const BOARD_REPOSITORY = Symbol('BoardRepository');

export type ListBoardsResponse = {
  boards: Board[];
};
