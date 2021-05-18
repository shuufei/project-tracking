import {
  IBoardRepository,
  ListBoardsResponse,
} from '../interface/board-repository';

export const mockListBoardsResponse: ListBoardsResponse = {
  boards: [
    {
      id: 'board0001',
      name: 'board name 0001',
      description: 'board description 0001',
      projectId: 'project0001',
    },
    {
      id: 'board0002',
      name: 'board name 0002',
      description: 'board description 0002',
      projectId: 'project0002',
    },
    {
      id: 'board0003',
      name: 'board name 0003',
      projectId: 'project0003',
    },
  ],
};

export class MockBoardRepository implements IBoardRepository {
  async listBoardsByProjectId() {
    return mockListBoardsResponse;
  }
}
