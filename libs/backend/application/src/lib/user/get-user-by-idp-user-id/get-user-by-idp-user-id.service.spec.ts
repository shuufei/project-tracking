import {
  MockUserRepository,
  mockUserRepositoryReturnValues,
} from '@bison/backend/domain';
import { GetUserByIdpUserIdService } from './get-user-by-idp-user-id.service';
describe('GetUserByIdpUserIdService', () => {
  let service: GetUserByIdpUserIdService;
  const userRepository = new MockUserRepository();

  beforeEach(() => {
    service = new GetUserByIdpUserIdService(userRepository);
  });

  describe('正常系', () => {
    const idpUserId = 'idpUser0001';

    beforeEach(() => {
      jest.spyOn(userRepository, 'getByIdpUserId');
    });

    test('user情報を取得できる', async () => {
      const response = await service.handle(idpUserId);
      expect(response).toEqual(mockUserRepositoryReturnValues.getByIdpUserId);
    });

    test('指定したidpUserIdで、UserRepositoryからuser情報取得が行われる', async () => {
      await service.handle(idpUserId);
      expect(userRepository.getByIdpUserId).toHaveBeenCalledWith(idpUserId);
    });
  });
});
