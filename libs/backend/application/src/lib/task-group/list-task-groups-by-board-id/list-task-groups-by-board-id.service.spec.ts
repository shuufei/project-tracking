import {
  MockTaskGroupRepository,
  mockTaskGroupRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListTaskGroupsByBoardIdService } from './list-task-groups-by-board-id.service';
describe('ListTaskGroupsByBoardIdService', () => {
  let service: ListTaskGroupsByBoardIdService;
  const taskGroupRepository = new MockTaskGroupRepository();

  beforeEach(() => {
    service = new ListTaskGroupsByBoardIdService(taskGroupRepository);
  });

  describe('正常系', () => {
    const boardId = createId();

    beforeEach(() => {
      jest.spyOn(taskGroupRepository, 'listByBoardId');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('taskGroup一覧を取得できる', async () => {
      const actual = await service.handle(boardId);
      expect(actual).toEqual(mockTaskGroupRepositoryReturnValues.listByBoardId);
    });

    test('指定したboardIdで、TaskGroupRepositoryからtaskGroup一覧取得処理が行われる', async () => {
      await service.handle(boardId);
      expect(taskGroupRepository.listByBoardId).toHaveBeenCalledWith(boardId);
    });
  });
});
