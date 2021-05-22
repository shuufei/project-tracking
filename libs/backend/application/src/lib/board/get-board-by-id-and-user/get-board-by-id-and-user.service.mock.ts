import { MockReturnValues } from '@bison/types/testing';
import { IGetBoardByIdAndUserService } from './get-board-by-id-and-user.service.interface';

export const mockGetBoardByIdAndUserServiceReturnValues: MockReturnValues<IGetBoardByIdAndUserService> = {
  handle: {
    id: `board0001`,
    name: `board name 0001`,
    description: `board description 0001`,
    projectId: 'project0001',
  },
};

export class MockGetBoardByIdService implements IGetBoardByIdAndUserService {
  async handle() {
    return mockGetBoardByIdAndUserServiceReturnValues.handle;
  }
}
