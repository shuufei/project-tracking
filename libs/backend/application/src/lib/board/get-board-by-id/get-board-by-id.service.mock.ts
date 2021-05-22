import { MockReturnValues } from '@bison/types/testing';
import type { IGetBoardByIdServiceBoardByIdService } from './get-board-by-id.service.interface';

export const mockGetBoardByIdServiceReturnValues: MockReturnValues<IGetBoardByIdServiceBoardByIdService> = {
  handle: {
    id: `board0001`,
    name: `board name 0001`,
    description: `board description 0001`,
    projectId: 'project0001',
  },
};

export class MockGetBoardByIdService
  implements IGetBoardByIdServiceBoardByIdService {
  async handle() {
    return mockGetBoardByIdServiceReturnValues.handle;
  }
}
