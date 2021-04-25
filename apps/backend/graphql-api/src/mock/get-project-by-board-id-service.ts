import {
  GetProjectByBoardIdResponse,
  IGetProjectByBoardIdService,
} from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { getRandom } from '../app/util/get-random-number';

export const mockGetProjectByBoardIdResponse: GetProjectByBoardIdResponse = {
  id: `project${getRandom()}`,
  name: `project name ${getRandom()}`,
  description: `project description ${getRandom()}`,
  color: 'red' as Color,
};

export class MockGetProjectByBoardIdService
  implements IGetProjectByBoardIdService {
  async handle() {
    return mockGetProjectByBoardIdResponse;
  }
}
