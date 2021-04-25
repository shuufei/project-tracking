import {
  IListProjectsByUserIdService,
  ListProjectsByUserIdResponse,
} from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { getRandom } from '../app/util/get-random-number';

export const mockListProjectsByUserIdResponse: ListProjectsByUserIdResponse = {
  projects: [
    {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: 'red' as Color,
    },
    {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: 'blue' as Color,
    },
    {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: 'green' as Color,
    },
  ],
};

export class MockListProjectsByUserIdService
  implements IListProjectsByUserIdService {
  async handle() {
    return mockListProjectsByUserIdResponse;
  }
}
