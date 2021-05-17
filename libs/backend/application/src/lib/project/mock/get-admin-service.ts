import {
  GetAdminResponse,
  IGetAdminService,
} from '../interface/get-admin-service';

export const mockGetAdminResponse: GetAdminResponse = {
  id: 'admin0001',
  name: 'admin name 0001',
  icon: 'admin icon 0001',
};

export class MockGetAdminService implements IGetAdminService {
  async handle() {
    return mockGetAdminResponse;
  }
}
