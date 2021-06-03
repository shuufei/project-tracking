import {
  MockCanAccessProjectService,
  MockProjectRepository,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { mockProjectRepositoryReturnValues } from '../../../../../domain/src/lib/project/project-repository/project-repository.mock';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import { GetProjectByIdAndUserService } from './get-project-by-id-and-user.service';

describe('GetProjectByIdAndUserService', () => {
  let service: GetProjectByIdAndUserService;
  const projectRepository = new MockProjectRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const projectId = createId();
  const user: User = {
    id: 'user0001',
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new GetProjectByIdAndUserService(
      projectRepository,
      canAccessProjectService
    );
  });

  describe('正常系', () => {
    describe('ユーザが、指定したプロジェクトにアクセスできる時', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'getById');
      });
      afterEach(() => {
        jest.resetAllMocks();
      });

      test('projectを取得できる', async () => {
        const actual = await service.handle(projectId, user);
        expect(actual).toEqual(mockProjectRepositoryReturnValues.getById);
      });
      test('指定したidで、ProjectRepositoryからprojectの取得が行われる', async () => {
        await service.handle(projectId, user);
        expect(projectRepository.getById).toHaveBeenCalledWith(projectId);
      });
    });
  });

  describe('異常系', () => {
    describe('ユーザが、指定したプロジェクトにアクセスできない時', () => {
      beforeEach(() => {
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      afterEach(() => {
        jest.resetAllMocks();
      });

      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(projectId, user)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
