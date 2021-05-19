import { COLOR } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { IGetProjectByBoardIdService } from '../interface/get-project-by-board-id-service';

export const mockGetProjectByBoardIdServiceReturnValues: MockReturnValues<IGetProjectByBoardIdService> = {
  handle: {
    id: `project001`,
    name: `project name 001`,
    description: `project description 001`,
    color: COLOR.Red,
  },
};

export class MockGetProjectByBoardIdService
  implements IGetProjectByBoardIdService {
  async handle() {
    return mockGetProjectByBoardIdServiceReturnValues.handle;
  }
}
