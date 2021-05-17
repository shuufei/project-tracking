import { IProjectRepository, ListResponse } from '@bison/backend/domain';
import { COLOR, createId } from '@bison/shared/domain';

export const mockListProjectsResponse: ListResponse = {
  projects: [
    {
      id: createId(),
      name: 'project 0001',
      color: COLOR.Red,
    },
    {
      id: createId(),
      name: 'project 0002',
      color: COLOR.Blue,
    },
  ],
};

export class MockProjectRepository implements IProjectRepository {
  async list() {
    return mockListProjectsResponse;
  }

  async listByUserId() {
    return mockListProjectsResponse;
  }
}
