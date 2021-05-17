import { COLOR } from '@bison/shared/domain';
import {
  IListProjectsService,
  ListProjectsResponse,
} from '../interface/list-projects-service';

export const mockListProjectsResponse: ListProjectsResponse = {
  projects: [
    {
      id: `project0001`,
      name: `project name 0001`,
      description: `project description 0001`,
      color: COLOR.Red,
      adminUserId: 'admin user 0001',
    },
    {
      id: `project0002`,
      name: `project name 0002`,
      description: `project description 0002`,
      color: COLOR.Blue,
      adminUserId: 'admin user 0001',
    },
    {
      id: `project0003`,
      name: `project name 0003`,
      description: `project description 0003`,
      color: COLOR.Green,
      adminUserId: 'admin user 0001',
    },
  ],
};

export class MockListProjectsService implements IListProjectsService {
  async handle() {
    return mockListProjectsResponse;
  }
}
