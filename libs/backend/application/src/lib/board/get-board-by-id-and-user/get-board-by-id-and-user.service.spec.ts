import {
  MockBoardRepository,
  mockBoardRepositoryReturnValues,
  MockCanAccessProjectService,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import { GetBoardByIdAndUserService } from './get-board-by-id-and-user.service';

describe('GetBoardByIdAndUserService', () => {
  let service: GetBoardByIdAndUserService;
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const boardId = createId();
  const user: User = {
    id: 'user0001',
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new GetBoardByIdAndUserService(
      boardRepository,
      canAccessProjectService
    );
  });

  describe('正常系', () => {
    describe('ユーザが、指定したボードのプロジェクトにアクセスできる時', () => {
      beforeEach(() => {
        jest.spyOn(boardRepository, 'getById');
      });
      afterEach(() => {
        jest.clearAllMocks();
      });

      test('boardを取得できる', async () => {
        const actual = await service.handle(boardId, user);
        expect(actual).toEqual(mockBoardRepositoryReturnValues.getById);
      });
      test('指定したidで、BoardRepositoryからboardの取得が行われる', async () => {
        await service.handle(boardId, user);
        expect(boardRepository.getById).toHaveBeenCalledTimes(1);
        expect(boardRepository.getById).toHaveBeenCalledWith(boardId);
      });
    });
  });

  describe('異常系', () => {
    describe('ユーザが、指定したボードのプロジェクトにアクセスできない時', () => {
      beforeEach(() => {
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });
      afterEach(() => {
        jest.resetAllMocks();
      });

      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(boardId, user)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
