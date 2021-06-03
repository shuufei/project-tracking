import {
  MockSubtaskRepository,
  mockSubtaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListSubtasksByTaskIdService } from './list-subtasks-by-task-id.service';

describe('ListSubtasksByTaskIdService', () => {
  let service: ListSubtasksByTaskIdService;
  const subtaskRepository = new MockSubtaskRepository();

  beforeEach(() => {
    service = new ListSubtasksByTaskIdService(subtaskRepository);
  });

  describe('正常系', () => {
    const taskId = createId();

    beforeEach(() => {
      jest.spyOn(subtaskRepository, 'listByTaskId');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('subtask一覧を取得できる', async () => {
      const actual = await service.handle(taskId);
      expect(actual).toEqual(mockSubtaskRepositoryReturnValues.listByTaskId);
    });

    test('指定されたtaskIdで、SubtaskRepositoryからsubtask一覧取得が行われる', async () => {
      await service.handle(taskId);
      expect(subtaskRepository.listByTaskId).toHaveBeenCalledWith(taskId);
    });
  });
});
