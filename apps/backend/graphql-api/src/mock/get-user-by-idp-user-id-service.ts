import { IGetUserByIdpUserIdService } from '@bison/backend/application';
import { User } from '@bison/shared/domain';

export const mockGetUserByIdpUserIdResponse: User = {
  id: 'user0001',
  name: 'user name 0001',
  icon: 'user icon 0001',
};

export class MockGetUserByIdpUserIdService
  implements IGetUserByIdpUserIdService {
  async handle() {
    return mockGetUserByIdpUserIdResponse;
  }
}
