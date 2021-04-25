import { GetMeResponse, IGetMeService } from '@bison/backend/application';

export const mockGetMeResponse: GetMeResponse = {
  id: 'admin0001',
  name: 'admin name 0001',
  icon: 'admin icon 0001',
};

export class MockGetMeService implements IGetMeService {
  async handle() {
    return mockGetMeResponse;
  }
}
