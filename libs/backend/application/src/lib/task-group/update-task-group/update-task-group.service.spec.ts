import {
  MockBoardRepository,
  MockCanAccessProjectService,
  MockTaskGroupRepository,
} from '@bison/backend/domain';
import { createId, STATUS, TaskGroup, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import { UpdateTaskGroupService } from './update-task-group.service';

describe('UpdateTaskGroupService', () => {
  let service: UpdateTaskGroupService;
  const taskGroupRepository = new MockTaskGroupRepository();
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new UpdateTaskGroupService(
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
      const taskGroup: TaskGroup = {
        id: 'taskGroup0001',
        title: 'taskGroup title 0001',
        description: 'taskGroup description 0001',
        status: STATUS.Confirm,
        assignUserId: 'user0001',
        boardId: 'board0001',
        tasksOrder: [],
      };
      beforeEach(() => {
        jest.spyOn(taskGroupRepository, 'update');
      });
      test('taskGroupを更新できる', async () => {
        await service.handle(taskGroup, requestUser);
        expect(taskGroupRepository.update).toHaveBeenCalledWith(taskGroup);
      });
      test('taskGroupを取得できる', async () => {
        const actual = await service.handle(taskGroup, requestUser);
        expect(actual).toEqual(taskGroup);
      });
    });
  });

  describe('異常系', () => {
    describe('リクエストユーザにアクセス権限がないとき', () => {
      const taskGroup: TaskGroup = {
        id: 'taskGroup0001',
        title: 'taskGroup title 0001',
        description: 'taskGroup description 0001',
        status: STATUS.Confirm,
        assignUserId: 'user0001',
        boardId: 'board0001',
        tasksOrder: [],
      };
      beforeEach(() => {
        jest.spyOn(taskGroupRepository, 'update');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('taskGroupを削除できない', async () => {
        try {
          await service.handle(taskGroup, requestUser);
        } catch {
          expect(taskGroupRepository.update).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorをthrowする', async () => {
        await expect(
          service.handle(taskGroup, requestUser)
        ).rejects.toThrowError(PermissionDeniedError);
      });
    });
  });
});
