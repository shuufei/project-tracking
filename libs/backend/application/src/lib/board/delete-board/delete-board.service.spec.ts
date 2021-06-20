import {
  MockBoardRepository,
  mockBoardRepositoryReturnValues,
  MockCanAccessProjectService,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { DeleteBoardService } from './delete-board.service';
describe('DeleteBoardService', () => {
  let service: DeleteBoardService;
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const requestUser: User = {
    id: createId(),
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new DeleteBoardService(boardRepository, canAccessProjectService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('正常系', () => {
    const boardId = createId();
    describe('リクエストユーザにアクセス権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(boardRepository, 'delete');
      });
      test('boardを削除できる', async () => {
        await service.handle(boardId, requestUser);
        expect(boardRepository.delete).toHaveBeenCalledWith(boardId);
      });
      test('boardを取得できる', async () => {
        const board = await service.handle(boardId, requestUser);
        expect(board).toEqual(mockBoardRepositoryReturnValues.getById);
      });
    });
  });

  describe('異常系', () => {
    const boardId = createId();
    describe('リクエストユーザにアクセス権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
        jest.spyOn(boardRepository, 'delete');
      });
      test('boardが削除されない', async () => {
        try {
          await service.handle(boardId, requestUser);
        } catch {
          expect(boardRepository.delete).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(boardId, requestUser)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
