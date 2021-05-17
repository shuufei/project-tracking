import { User } from '@bison/shared/domain';
import { IUserRepositoy } from '../interface/user-repository';

export const mockGetUserResponse: User = {
  id: 'user0002',
  name: 'user name 0002',
  icon: 'user icon 0002',
};

export class MockUserRepository implements IUserRepositoy {
  async getById() {
    return mockGetUserResponse;
  }
  async getByIdpUserId() {
    return mockGetUserResponse;
  }
}
