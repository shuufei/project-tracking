import {
  MockBoardRepository,
  mockBoardRepositoryReturnValues,
  MockCanAccessProjectService,
} from '@bison/backend/domain';
import { createBoard, createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { UpdateBoardService } from './update-board.service';

describe('UpdateBoardService', () => {
  let service: UpdateBoardService;
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };
  beforeEach(() => {
    service = new UpdateBoardService(boardRepository, canAccessProjectService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('正常系', () => {
    const board = createBoard(
      'board name 0001',
      createId(),
      'board description 0001'
    );
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(boardRepository, 'update');
      });
      test('boardを更新できる', async () => {
        await service.handle(board, requestUser);
        expect(boardRepository.update).toHaveBeenCalledWith(board);
      });
      test('boardを取得できる', async () => {
        const actual = await service.handle(board, requestUser);
        expect(actual).toEqual(mockBoardRepositoryReturnValues.update);
      });
    });
  });

  describe('異常系', () => {
    const board = createBoard(
      'board name 0001',
      createId(),
      'board description 0001'
    );
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(boardRepository, 'update');
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      test('boardが更新されない', async () => {
        try {
          await service.handle(board, requestUser);
        } catch {
          expect(boardRepository.update).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(board, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
