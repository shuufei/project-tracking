import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockSubtaskRepository,
  MockTaskRepository,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { CreateSubtaskService } from './create-subtask.service';
import { CreateSubtaskServiceInput } from './create-subtask.service.interface';

describe('CreateSubtaskService', () => {
  let service: CreateSubtaskService;
  const subtaskRepository = new MockSubtaskRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const taskRepository = new MockTaskRepository();
  const boardRepository = new MockBoardRepository();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new CreateSubtaskService(
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
    const input: CreateSubtaskServiceInput = {
      title: 'subtask title 0001',
      description: 'subtask description 0001',
      assignUserId: createId(),
      taskId: createId(),
      scheduledTimeSec: 120,
    };
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(subtaskRepository, 'create');
      });
      test('subtaskを作成できる', async () => {
        await service.handle(input, requestUser);
        expect(subtaskRepository.create).toHaveBeenCalledWith({
          ...input,
          id: expect.anything(),
          isDone: false,
          workTimeSec: 0,
        });
      });
      test('subtaskを取得できる', async () => {
        const subtask = await service.handle(input, requestUser);
        expect(subtask).toEqual({
          ...input,
          id: expect.anything(),
          isDone: false,
          workTimeSec: 0,
        });
      });
    });
  });

  describe('異常系', () => {
    const input: CreateSubtaskServiceInput = {
      title: 'subtask title 0001',
      description: 'subtask description 0001',
      assignUserId: createId(),
      taskId: createId(),
      scheduledTimeSec: 120,
    };

    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(subtaskRepository, 'create');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('subtaskが作成されない', async () => {
        try {
          await service.handle(input, requestUser);
        } catch {
          expect(subtaskRepository.create).not.toHaveBeenCalled();
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
