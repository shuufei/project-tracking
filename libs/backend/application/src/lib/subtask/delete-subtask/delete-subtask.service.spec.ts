import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockSubtaskRepository,
  mockSubtaskRepositoryReturnValues,
  MockTaskRepository,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { DeleteSubtaskService } from './delete-subtask.service';

describe('DeleteSubtaskService', () => {
  let service: DeleteSubtaskService;
  const subtaskRepository = new MockSubtaskRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const taskRepository = new MockTaskRepository();
  const boardRepository = new MockBoardRepository();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new DeleteSubtaskService(
      subtaskRepository,
      canAccessProjectService,
      taskRepository,
      boardRepository
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const subtaskId = createId();
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(subtaskRepository, 'delete');
      });
      test('subtaskを削除できる', async () => {
        await service.handle(subtaskId, requestUser);
        expect(subtaskRepository.delete).toHaveBeenCalledWith(subtaskId);
      });
      test('subtaskを取得できる', async () => {
        const subtask = await service.handle(subtaskId, requestUser);
        expect(subtask).toEqual(mockSubtaskRepositoryReturnValues.getById);
      });
    });
  });

  describe('異常系', () => {
    const subtaskId = createId();
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(subtaskRepository, 'delete');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('subtaskが削除されない', async () => {
        try {
          await service.handle(subtaskId, requestUser);
        } catch {
          expect(subtaskRepository.delete).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(
          service.handle(subtaskId, requestUser)
        ).rejects.toThrowError(PermissionDeniedError);
      });
    });
  });
});
