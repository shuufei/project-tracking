import { User } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { IUserRepositoy, ListUsersResponse } from './user-repository.interface';

const mockGetUserResponse: User = {
  id: 'user0002',
  name: 'user name 0002',
  icon: 'user icon 0002',
};

const mockListUsersResponse: ListUsersResponse = {
  users: [
    {
      id: 'user0001',
      name: 'user name 0001',
      icon: 'user icon 0001',
    },
    {
      id: 'user0002',
      name: 'user name 0002',
      icon: 'user icon 0002',
    },
  ],
};

export const mockUserRepositoryReturnValues: MockReturnValues<IUserRepositoy> = {
  getById: mockGetUserResponse,
  getByIdpUserId: mockGetUserResponse,
  listByProjectId: mockListUsersResponse,
  list: mockListUsersResponse,
};

export class MockUserRepository implements IUserRepositoy {
  async getById() {
    return mockUserRepositoryReturnValues.getById;
  }
  async getByIdpUserId() {
    return mockUserRepositoryReturnValues.getByIdpUserId;
  }
  async listByProjectId() {
    return mockUserRepositoryReturnValues.listByProjectId;
  }

  async list() {
    return mockUserRepositoryReturnValues.list;
  }
}
