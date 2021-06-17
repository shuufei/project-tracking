import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockTaskGroupRepository,
  mockTaskGroupRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { DeleteTaskGroupService } from './delete-task-group.service';

describe('DeleteTaskGroupService', () => {
  let service: DeleteTaskGroupService;
  const taskGroupRepository = new MockTaskGroupRepository();
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new DeleteTaskGroupService(
      taskGroupRepository,
      boardRepository,
      canAccessProjectService
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    describe('リクエストユーザにアクセス権限があるとき', () => {
      const taskGroupId = createId();
      beforeEach(() => {
        jest.spyOn(taskGroupRepository, 'delete');
      });
      test('taskGroupを削除できる', async () => {
        await service.handle(taskGroupId, requestUser);
        expect(taskGroupRepository.delete).toHaveBeenCalledWith(taskGroupId);
      });
      test('taskGroupを取得できる', async () => {
        const actual = await service.handle(taskGroupId, requestUser);
        expect(actual).toEqual(mockTaskGroupRepositoryReturnValues.getById);
      });
    });
  });

  describe('異常系', () => {
    describe('リクエストユーザにアクセス権限がないとき', () => {
      const taskGroupId = createId();
      beforeEach(() => {
        jest.spyOn(taskGroupRepository, 'delete');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('taskGroupを削除できない', async () => {
        try {
          await service.handle(taskGroupId, requestUser);
        } catch {
          expect(taskGroupRepository.delete).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorをthrowする', async () => {
        await expect(
          service.handle(taskGroupId, requestUser)
        ).rejects.toThrowError(PermissionDeniedError);
      });
    });
  });
});
