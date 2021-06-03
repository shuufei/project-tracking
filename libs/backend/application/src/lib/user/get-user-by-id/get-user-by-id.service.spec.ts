import {
  MockUserRepository,
  mockUserRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { GetUserByIdService } from './get-user-by-id.service';

describe('GetUserByIdService', () => {
  let service: GetUserByIdService;
  const userRepository = new MockUserRepository();

  beforeEach(() => {
    service = new GetUserByIdService(userRepository);
  });

  describe('正常系', () => {
    const userId = createId();

    beforeEach(() => {
      jest.spyOn(userRepository, 'getById');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('user情報を取得できる', async () => {
      const response = await service.handle(userId);
      expect(response).toEqual(mockUserRepositoryReturnValues.getById);
    });

    test('指定したidで、UserRepositoryからuser情報取得が行われる', async () => {
      await service.handle(userId);
      expect(userRepository.getById).toHaveBeenCalledWith(userId);
    });
  });
});
