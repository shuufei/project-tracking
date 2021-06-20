import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockTaskRepository,
  mockTaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId, STATUS, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { CreateTaskOnBoardService } from './create-task-on-board.service';
import { CreateTaskOnBoardServiceInput } from './create-task-on-board.service.interface';

describe('CreateTaskOnBoardService', () => {
  let service: CreateTaskOnBoardService;
  const taskRepository = new MockTaskRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const boardRepository = new MockBoardRepository();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new CreateTaskOnBoardService(
      taskRepository,
      canAccessProjectService,
      boardRepository
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const input: CreateTaskOnBoardServiceInput = {
      title: 'task title 0001',
      description: 'task description 0001',
      assignUserId: createId(),
      boardId: createId(),
    };
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(taskRepository, 'create');
      });
      test('boardにtaskを作成できる', async () => {
        await service.handle(input, requestUser);
        expect(taskRepository.create).toHaveBeenCalledWith({
          ...input,
          id: expect.anything(),
          status: STATUS.Todo,
          workTimeSec: 0,
          subtasksOrder: [],
        });
      });
      test('taskを取得できる', async () => {
        const task = await service.handle(input, requestUser);
        expect(task).toEqual(mockTaskRepositoryReturnValues.create);
      });
    });
  });
  describe('異常系', () => {
    const input: CreateTaskOnBoardServiceInput = {
      title: 'task title 0001',
      description: 'task description 0001',
      assignUserId: createId(),
      boardId: createId(),
    };
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(taskRepository, 'create');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('boadにtaskが作成されない', async () => {
        try {
          await service.handle(input, requestUser);
        } catch {
          expect(taskRepository.create).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(input, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
