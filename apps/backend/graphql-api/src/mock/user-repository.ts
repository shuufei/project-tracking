import { IUserRepositoy } from '@bison/backend/domain';
import { User } from '@bison/shared/domain';

export const mockGetByIdpUserIdResponse: User = {
  id: 'user0002',
  name: 'user name 0002',
  icon: 'user icon 0002',
};

export class MockUserRepository implements IUserRepositoy {
  async getByIdpUserId() {
    return mockGetByIdpUserIdResponse;
  }
}
