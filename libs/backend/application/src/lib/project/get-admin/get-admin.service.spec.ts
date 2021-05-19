import {
  MockProjectRepository,
  mockProjectRepositoryReturnValues,
  MockUserRepository,
  mockUserRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { GetAdminService } from './get-admin.service';

describe('GetAdminService', () => {
  let service: GetAdminService;
  const userRepository = new MockUserRepository();
  const projectRepository = new MockProjectRepository();

  beforeEach(() => {
    service = new GetAdminService(projectRepository, userRepository);
  });

  describe('正常系', () => {
    const projectId = createId();

    beforeEach(() => {
      jest.spyOn(projectRepository, 'getById');
      jest.spyOn(userRepository, 'getById');
    });

    test('admin情報を取得できる', async () => {
      const response = await service.handle(projectId);
      expect(response).toEqual(mockUserRepositoryReturnValues.getById);
    });

    test('指定したprojectIdで、ProjectRepositoryからproject情報取得が行われる', async () => {
      await service.handle(projectId);
      expect(projectRepository.getById).toHaveBeenCalledWith(projectId);
    });

    test('projectのadminUserIdに指定されているユーザで、UserRepositoryからuser情報取得が行われる', async () => {
      await service.handle(projectId);
      expect(userRepository.getById).toHaveBeenCalledWith(
        (await mockProjectRepositoryReturnValues.getById).adminUserId
      );
    });
  });
});
