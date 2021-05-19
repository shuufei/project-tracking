import { COLOR } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import {
  IProjectRepository,
  ListProjectsResponse,
} from './project-repository.interface';

const mockListProjectsResponse: ListProjectsResponse = {
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

export const mockProjectRepositoryReturnValues: MockReturnValues<IProjectRepository> = {
  getById: {
    id: `project0001`,
    name: `project name 0001`,
    description: `project description 0001`,
    color: COLOR.Red,
    adminUserId: 'admin user 0001',
  },
  list: mockListProjectsResponse,
  listByUserId: mockListProjectsResponse,
};

export class MockProjectRepository implements IProjectRepository {
  async getById() {
    return mockProjectRepositoryReturnValues.getById;
  }

  async list() {
    return mockProjectRepositoryReturnValues.list;
  }

  async listByUserId() {
    return mockProjectRepositoryReturnValues.listByUserId;
  }
}
