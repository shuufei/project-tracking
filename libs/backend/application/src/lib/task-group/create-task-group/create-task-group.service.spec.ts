import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockTaskGroupRepository,
} from '@bison/backend/domain';
import { createId, STATUS, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import { CreateTaskGroupService } from './create-task-group.service';
import { CreateTaskGroupServiceInput } from './create-task-group.service.interface';

describe('CreateTaskGroupService', () => {
  let service: CreateTaskGroupService;
  const taskGroupRepository = new MockTaskGroupRepository();
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new CreateTaskGroupService(
      taskGroupRepository,
      canAccessProjectService,
      boardRepository
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const input: CreateTaskGroupServiceInput = {
      title: 'taskGroup title 0001',
      description: 'taskGroup description 0001',
      assignUserId: 'user0001',
      boardId: 'board0001',
      scheduledTimeSec: 3600,
    };
    beforeEach(() => {
      jest.spyOn(taskGroupRepository, 'create');
    });
    describe('リクエストユーザにアクセス権限があるとき', () => {
      test('taskGroupを作成できる', async () => {
        await service.handle(input, requestUser);
        expect(taskGroupRepository.create).toHaveBeenCalledWith({
          ...input,
          id: expect.anything(),
          status: STATUS.Todo,
          tasksOrder: [],
        });
      });
      test('taskGroupを取得できる', async () => {
        const taskGroup = await service.handle(input, requestUser);
        expect(taskGroup).toEqual({
          ...input,
          id: expect.anything(),
          status: STATUS.Todo,
          tasksOrder: [],
        });
      });
    });
  });

  describe('異常系', () => {
    const input: CreateTaskGroupServiceInput = {
      title: 'taskGroup title 0001',
      description: 'taskGroup description 0001',
      assignUserId: 'user0001',
      boardId: 'board0001',
      scheduledTimeSec: 3600,
    };
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(taskGroupRepository, 'create');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('taskGroupを作成できない', async () => {
        try {
          await service.handle(input, requestUser);
        } catch {
          expect(taskGroupRepository.create).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorをthrowする', async () => {
        await expect(service.handle(input, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
