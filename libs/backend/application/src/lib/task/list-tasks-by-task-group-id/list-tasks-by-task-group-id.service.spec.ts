import {
  MockTaskRepository,
  mockTaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListTasksByTaskGroupIdService } from './list-tasks-by-task-group-id.service';

describe('ListTasksByTaskGroupIdService', () => {
  let service: ListTasksByTaskGroupIdService;
  const taskRepository = new MockTaskRepository();

  beforeEach(() => {
    service = new ListTasksByTaskGroupIdService(taskRepository);
  });

  describe('正常系', () => {
    const taskGroupId = createId();

    beforeEach(() => {
      jest.spyOn(taskRepository, 'listByTaskGroupId');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('task一覧を取得できる', async () => {
      const actual = await service.handle(taskGroupId);
      expect(actual).toEqual(mockTaskRepositoryReturnValues.listByTaskGroupId);
    });

    test('指定したtaskGroupIdで、TaskRepositoryからtask一覧取得処理が行われる', async () => {
      await service.handle(taskGroupId);
      expect(taskRepository.listByTaskGroupId).toHaveBeenCalledWith(
        taskGroupId
      );
    });
  });
});
