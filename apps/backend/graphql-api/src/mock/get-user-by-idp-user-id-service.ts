import {
  GetMeResponse,
  IGetUserByIdpUserIdService,
} from '@bison/backend/application';

export const mockGetUserByIdpUserIdResponse: GetMeResponse = {
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
