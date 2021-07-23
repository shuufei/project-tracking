import { COLOR, createId } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { IGetProjectByBoardIdService } from './get-project-by-board-id.service.interface';

export const mockGetProjectByBoardIdServiceReturnValues: MockReturnValues<IGetProjectByBoardIdService> = {
  handle: {
    id: `project0001`,
    name: `project name 0001`,
    description: `project description 0001`,
    color: COLOR.Red,
    adminUserId: createId(),
  },
};

export class MockGetProjectByBoardIdService
  implements IGetProjectByBoardIdService {
  async handle() {
    return mockGetProjectByBoardIdServiceReturnValues.handle;
  }
}
