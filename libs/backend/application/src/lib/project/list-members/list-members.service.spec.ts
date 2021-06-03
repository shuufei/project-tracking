import {
  MockUserRepository,
  mockUserRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListMembersService } from './list-members.service';

describe('ListMembersService', () => {
  let service: ListMembersService;
  const userRepository = new MockUserRepository();

  beforeEach(() => {
    service = new ListMembersService(userRepository);
  });

  describe('正常系', () => {
    const projectId = createId();

    beforeEach(() => {
      jest.spyOn(userRepository, 'listByProjectId');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('member一覧を取得できる', async () => {
      const response = await service.handle(projectId);
      expect(response).toEqual(mockUserRepositoryReturnValues.listByProjectId);
    });

    test('指定したprojectIdで、UserRepositoryからuser一覧取得が行われる', async () => {
      await service.handle(projectId);
      expect(userRepository.listByProjectId).toHaveBeenCalledWith(projectId);
    });
  });
});
