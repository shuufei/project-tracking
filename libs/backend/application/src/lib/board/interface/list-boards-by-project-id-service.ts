import { Board, Project } from '@bison/shared/domain';
export interface IListBoardsByProjectIdService {
  handle: (
    projectId: Project['id'],
    first: number,
    after?: Board['id']
  ) => ListBoardsByProjectIdResponse;
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
  cursor: string;
};

export type ListBoardsByProjectIdResponse = Promise<{
  edges: BoardEdge[];
  hasNextPage: boolean;
}>;
