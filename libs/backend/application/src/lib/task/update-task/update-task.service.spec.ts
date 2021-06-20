import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockTaskRepository,
  mockTaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId, createTask, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { UpdateTaskService } from './update-task.service';

describe('UpdateTaskService', () => {
  let service: UpdateTaskService;
  const taskRepository = new MockTaskRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const boardRepository = new MockBoardRepository();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new UpdateTaskService(
      taskRepository,
      canAccessProjectService,
      boardRepository
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const task = createTask(
      'task title 0001',
      createId(),
      createId(),
      'task description 0001',
      createId()
    );
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(taskRepository, 'update');
      });
      test('boardにtaskを更新できる', async () => {
        await service.handle(task, requestUser);
        expect(taskRepository.update).toHaveBeenCalledWith(task);
      });
      test('taskを取得できる', async () => {
        const actual = await service.handle(task, requestUser);
        expect(actual).toEqual(mockTaskRepositoryReturnValues.update);
      });
    });
  });
  describe('異常系', () => {
    const task = createTask(
      'task title 0001',
      createId(),
      createId(),
      'task description 0001',
      createId()
    );
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(taskRepository, 'update');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('boadにtaskが更新されない', async () => {
        try {
          await service.handle(task, requestUser);
        } catch {
          expect(taskRepository.update).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(task, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
