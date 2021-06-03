import {
  MockBoardRepository,
  mockBoardRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { GetBoardByIdService } from './get-board-by-id.service';

describe('GetBoardByIdService', () => {
  let service: GetBoardByIdService;
  const boardRepository = new MockBoardRepository();
  const boardId = createId();

  beforeEach(() => {
    service = new GetBoardByIdService(boardRepository);
  });

  describe('正常系', () => {
    beforeEach(() => {
      jest.spyOn(boardRepository, 'getById');
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('boardを取得できる', async () => {
      const actual = await service.handle(boardId);
      expect(actual).toEqual(mockBoardRepositoryReturnValues.getById);
    });
    test('指定したidで、BoardRepositoryからboardの取得が行われる', async () => {
      await service.handle(boardId);
      expect(boardRepository.getById).toHaveBeenCalledWith(boardId);
    });
  });
});
