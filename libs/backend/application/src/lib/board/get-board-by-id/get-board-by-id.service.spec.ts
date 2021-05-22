import {
  MockBoardRepository,
  MockCanAccessProjectService,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import { GetBoardByIdService } from './get-board-by-id.service';
import { mockGetBoardByIdServiceReturnValues } from './get-board-by-id.service.mock';
describe('GetBoardByIdService', () => {
  let service: GetBoardByIdService;
  const boardRepository = new MockBoardRepository();
  const canAccessProjectService = new MockCanAccessProjectService();
  const boardId = createId();
  const user: User = {
    id: 'user0001',
    name: 'user name 0001',
  };

  beforeEach(() => {
    service = new GetBoardByIdService(boardRepository, canAccessProjectService);
  });

  describe('正常系', () => {
    describe('ユーザが、指定したボードのプロジェクトにアクセスできる時', () => {
      beforeEach(() => {
        jest.spyOn(boardRepository, 'getById');
      });

      test('boardを取得できる', async () => {
        const actual = await service.handle(boardId, user);
        expect(actual).toEqual(mockGetBoardByIdServiceReturnValues.handle);
      });
      test('指定したidで、BoardRepositoryからboardの取得が行われる', () => {
        expect(boardRepository.getById).toHaveBeenCalledWith(boardId);
      });
    });
  });

  describe('異常系', () => {
    describe('ユーザが、指定したボードのプロジェクトにアクセスできない時', () => {
      beforeEach(() => {
        jest.spyOn(canAccessProjectService, 'handle').mockResolvedValue(false);
      });

      test('PermissionDeniedErrorがthrowされる', async () => {
        await expect(service.handle(boardId, user)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
