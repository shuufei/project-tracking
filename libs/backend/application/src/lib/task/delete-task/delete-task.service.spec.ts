import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockTaskRepository,
  mockTaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { DeleteTaskService } from './delete-task.service';

describe('DeleteTaskService', () => {
  let service: DeleteTaskService;
  const taskRepository = new MockTaskRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const boardRepository = new MockBoardRepository();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new DeleteTaskService(
      taskRepository,
      canAccessProjectService,
      boardRepository
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const taskId = createId();
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(taskRepository, 'delete');
      });
      test('boardにtaskを削除できる', async () => {
        await service.handle(taskId, requestUser);
        expect(taskRepository.delete).toHaveBeenCalledWith(taskId);
      });
      test('taskを取得できる', async () => {
        const task = await service.handle(taskId, requestUser);
        expect(task).toEqual(mockTaskRepositoryReturnValues.getById);
      });
    });
  });
  describe('異常系', () => {
    const taskId = createId();
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(taskRepository, 'delete');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('boadにtaskが削除されない', async () => {
        try {
          await service.handle(taskId, requestUser);
        } catch {
          expect(taskRepository.delete).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(taskId, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
