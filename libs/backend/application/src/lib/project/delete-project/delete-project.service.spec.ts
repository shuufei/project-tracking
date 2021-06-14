import {
  MockCanAccessProjectService,
  MockProjectRepository,
  mockProjectRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { DeleteProjectService } from './delete-project.service';

describe('DeleteProjectService', () => {
  let service: DeleteProjectService;
  const projectRepository = new MockProjectRepository();
  const canEditProjectService = new MockCanAccessProjectService();

  beforeEach(() => {
    service = new DeleteProjectService(
      projectRepository,
      canEditProjectService
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const user: User = {
      id: createId(),
      name: 'user0001',
    };
    const projectId = createId();
    describe('リクエストユーザがprojectの削除権限を持っているとき', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'delete');
      });
      test('projectを削除できる', async () => {
        await service.handle(projectId, user);
        expect(projectRepository.delete).toHaveBeenCalledWith(projectId);
      });

      test('削除したprojectを返す', async () => {
        const actual = await service.handle(projectId, user);
        expect(actual).toEqual(mockProjectRepositoryReturnValues.delete);
      });
    });
  });

  describe('異常系', () => {
    const user: User = {
      id: createId(),
      name: 'user0001',
    };
    const projectId = createId();
    describe('リクエストユーザがprojectの削除権限を持っていないとき', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'delete');
        jest.spyOn(canEditProjectService, 'handle').mockResolvedValue(false);
      });
      test('projectが削除されない', async () => {
        try {
          await service.handle(projectId, user);
        } catch {
          expect(projectRepository.delete).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorをthrowする', async () => {
        await expect(service.handle(projectId, user)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
