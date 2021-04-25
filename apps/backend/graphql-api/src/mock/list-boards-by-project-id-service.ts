import {
  IListBoardsByProjectIdService,
  ListBoardsByProjectIdResponse,
} from '@bison/backend/application';

export const mockListBoardsByProjectIdResponse: ListBoardsByProjectIdResponse = {
  boards: [
    {
      id: `board0001`,
      name: `board name 0001`,
      description: `board description 0001`,
    },
    {
      id: `board0002`,
      name: `board name 0002`,
      description: `board description 0002`,
    },
    {
      id: `board0003`,
      name: `board name 0003`,
      description: `board description 0003`,
    },
  ],
};

export class MockListBoardsByProjectIdService
  implements IListBoardsByProjectIdService {
  async handle() {
    return mockListBoardsByProjectIdResponse;
  }
}
