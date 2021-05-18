import { Board, Project } from '@bison/shared/domain';

export interface IBoardRepository {
  listByProjectId: (projectId: Project['id']) => Promise<ListBoardsResponse>;
}

export const BOARD_REPOSITORY = Symbol('BoardRepository');

export type ListBoardsResponse = {
  boards: Board[];
};
