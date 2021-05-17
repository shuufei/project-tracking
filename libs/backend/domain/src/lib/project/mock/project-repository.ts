import { COLOR, Project } from '@bison/shared/domain';
import {
  IProjectRepository,
  ListResponse,
} from '../interface/project-repository';

export const mockGetProjectResponse: Project = {
  id: `project0001`,
  name: `project name 0001`,
  description: `project description 0001`,
  color: COLOR.Red,
  adminUserId: 'admin user 0001',
};

export const mockListProjectsResponse: ListResponse = {
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
      adminUserId: 'admin user 0002',
    },
  ],
};

export class MockProjectRepository implements IProjectRepository {
  async getById() {
    return mockGetProjectResponse;
  }

  async list() {
    return mockListProjectsResponse;
  }

  async listByUserId() {
    return mockListProjectsResponse;
  }
}
