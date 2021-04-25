import {
  GetProjectByBacklogIdResponse,
  IGetProjectByBacklogIdService,
} from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { getRandom } from '../app/util/get-random-number';

export const mockGetProjectByBacklogIdResponse: GetProjectByBacklogIdResponse = {
  id: `project${getRandom()}`,
  name: `project name ${getRandom()}`,
  description: `project description ${getRandom()}`,
  color: 'red' as Color,
};

export class MockGetProjectByBacklogIdService
  implements IGetProjectByBacklogIdService {
  async handle() {
    return mockGetProjectByBacklogIdResponse;
  }
}
