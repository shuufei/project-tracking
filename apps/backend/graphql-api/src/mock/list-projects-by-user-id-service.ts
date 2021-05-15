import {
  IListProjectsByUserIdService,
  ListProjectsByUserIdResponse,
} from '@bison/backend/application';
import { COLOR } from '@bison/shared/domain';
import { getRandom } from '../app/util/get-random-number';

export const mockListProjectsByUserIdResponse: ListProjectsByUserIdResponse = {
  projects: [
    {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: COLOR.Red,
    },
    {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: COLOR.Blue,
    },
    {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: COLOR.Green,
    },
  ],
};

export class MockListProjectsByUserIdService
  implements IListProjectsByUserIdService {
  async handle() {
    return mockListProjectsByUserIdResponse;
  }
}
