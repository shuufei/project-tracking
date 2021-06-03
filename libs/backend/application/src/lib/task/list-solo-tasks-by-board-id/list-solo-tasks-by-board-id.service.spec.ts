import {
  MockTaskRepository,
  mockTaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListSoloTasksByBoardIdService } from './list-solo-tasks-by-board-id.service';

describe('ListSoloTasksByBoardIdService', () => {
  let service: ListSoloTasksByBoardIdService;
  const taskRepository = new MockTaskRepository();

  beforeEach(() => {
    service = new ListSoloTasksByBoardIdService(taskRepository);
  });

  describe('正常系', () => {
    const boardId = createId();

    beforeEach(() => {
      jest.spyOn(taskRepository, 'listSoloTasksByBoardId');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('task一覧を取得できる', async () => {
      const actual = await service.handle(boardId);
      expect(actual).toEqual(
        mockTaskRepositoryReturnValues.listSoloTasksByBoardId
      );
    });

    test('指定したboardIdで、TaskRepositoryからtask一覧取得が行われる', async () => {
      await service.handle(boardId);
      expect(taskRepository.listSoloTasksByBoardId).toHaveBeenCalledWith(
        boardId
      );
    });
  });
});
