import {
  GetBacklogByProjectIdResponse,
  IGetBacklogByProjectIdService,
} from '@bison/backend/application';

export const mockGetBacklogByProjectIdResponse: GetBacklogByProjectIdResponse = {
  id: `mock backlog id 0001`,
};
export class MockGetBacklogByProjectIdService
  implements IGetBacklogByProjectIdService {
  async handle() {
    return mockGetBacklogByProjectIdResponse;
  }
}
