import { Board, Project } from '@bison/shared/domain';

export interface IListBoardsByProjectIdService {
  handle: (projectId: Project['id']) => Promise<ListBoardsByProjectIdResponse>;
}

export const LIST_BOARDS_BY_PROJECT_ID_SERVICE = Symbol(
  'ListBoardsByProjectIdService'
);

export type ListBoardsByProjectIdResponse = {
  boards: Board[];
};
