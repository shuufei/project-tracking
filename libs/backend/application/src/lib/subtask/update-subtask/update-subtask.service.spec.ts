import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockSubtaskRepository,
  MockTaskRepository,
} from '@bison/backend/domain';
import { createId, createSubtask, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { UpdateSubtaskService } from './update-subtask.service';

describe('UpdateSubtaskService', () => {
  let service: UpdateSubtaskService;
  const subtaskRepository = new MockSubtaskRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const taskRepository = new MockTaskRepository();
  const boardRepository = new MockBoardRepository();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new UpdateSubtaskService(
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
    const subtask = createSubtask(
      'subtask title 0001',
      createId(),
      createId(),
      'subtask description 0001',
      120
    );
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(subtaskRepository, 'update');
      });
      test('subtaskを更新できる', async () => {
        await service.handle(subtask, requestUser);
        expect(subtaskRepository.update).toHaveBeenCalledWith(subtask);
      });
      test('subtaskを取得できる', async () => {
        const actual = await service.handle(subtask, requestUser);
        expect(actual).toEqual(subtask);
      });
    });
  });

  describe('異常系', () => {
    const subtask = createSubtask(
      'subtask title 0001',
      createId(),
      createId(),
      'subtask description 0001',
      120
    );
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(subtaskRepository, 'update');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('subtaskが更新されない', async () => {
        try {
          await service.handle(subtask, requestUser);
        } catch {
          expect(subtaskRepository.update).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(subtask, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
