import { Cursor } from '@bison/backend/domain';
import { Board, Project } from '@bison/shared/domain';
export interface IListBoardsByProjectIdService {
  handle: (
    projectId: Project['id'],
    first: number,
    after?: Cursor
  ) => Promise<ListBoardsByProjectIdResponse>;
}

export const LIST_BOARDS_BY_PROJECT_ID_SERVICE = Symbol(
  'ListBoardsByProjectIdService'
);

export type BoardNode = Pick<
  Board,
  'id' | 'description' | 'name' | 'isArchived'
>;

export type BoardEdge = {
  node: BoardNode;
  cursor: Cursor;
};

export type ListBoardsByProjectIdResponse = {
  edges: BoardEdge[];
  hasNextPage: boolean;
};
