import {
  MockBoardRepository,
  MockCanAccessProjectService,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { CreateBoardService } from './create-board.service';
import { CreateBoardServiceInput } from './create-board.service.interface';

describe('CreateBoardService', () => {
  let service: CreateBoardService;
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new CreateBoardService(boardRepository, canAccessProjectService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const input: CreateBoardServiceInput = {
      name: 'board name 0001',
      description: 'board description 0001',
      projectId: createId(),
    };
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(boardRepository, 'create');
      });
      test('boardを作成できる', async () => {
        await service.handle(input, requestUser);
        expect(boardRepository.create).toHaveBeenCalledWith({
          ...input,
          id: expect.anything(),
          tasksOrder: [],
        });
      });
      test('boardを取得できる', async () => {
        const board = await service.handle(input, requestUser);
        expect(board).toEqual({
          ...input,
          id: expect.anything(),
          tasksOrder: [],
        });
      });
    });
  });

  describe('異常系', () => {
    const input: CreateBoardServiceInput = {
      name: 'board name 0001',
      description: 'board description 0001',
      projectId: createId(),
    };
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
        jest.spyOn(boardRepository, 'create');
      });
      test('boardが作成されない', async () => {
        try {
          await service.handle(input, requestUser);
        } catch {
          expect(boardRepository.create).not.toHaveBeenCalled();
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
