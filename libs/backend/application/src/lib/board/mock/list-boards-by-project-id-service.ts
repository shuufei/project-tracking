import {
  IListBoardsByProjectIdService,
  ListBoardsByProjectIdResponse,
} from '../interface/list-boards-by-project-id-service';

export const mockListBoardsByProjectIdResponse: ListBoardsByProjectIdResponse = {
  boards: [
    {
      id: `board0001`,
      name: `board name 0001`,
      description: `board description 0001`,
      projectId: 'project0001',
    },
    {
      id: `board0002`,
      name: `board name 0002`,
      description: `board description 0002`,
      projectId: 'project0002',
    },
    {
      id: `board0003`,
      name: `board name 0003`,
      description: `board description 0003`,
      projectId: 'project0003',
    },
  ],
};

export class MockListBoardsByProjectIdService
  implements IListBoardsByProjectIdService {
  async handle() {
    return mockListBoardsByProjectIdResponse;
  }
}
