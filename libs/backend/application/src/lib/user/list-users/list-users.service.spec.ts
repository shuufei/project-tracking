import {
  MockUserRepository,
  mockUserRepositoryReturnValues,
} from '@bison/backend/domain';
import { ListUsersService } from './list-users.service';

describe('ListUsersService', () => {
  let service: ListUsersService;
  const userRepository = new MockUserRepository();

  beforeEach(() => {
    service = new ListUsersService(userRepository);
  });

  describe('正常系', () => {
    beforeEach(() => {
      jest.spyOn(userRepository, 'list');
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('user一覧を取得できる', async () => {
      const actual = await service.handle();
      expect(actual).toEqual(mockUserRepositoryReturnValues.list);
    });

    test('UserRepositoryからのuser一覧取得処理が行われる', async () => {
      await service.handle();
      expect(userRepository.list).toHaveBeenCalled();
    });
  });
});
