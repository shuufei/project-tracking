import {
  MockTaskRepository,
  mockTaskRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { GetTaskByIdService } from './get-task-by-id.service';

describe('GetTaskByIdService', () => {
  let service: GetTaskByIdService;
  const taskRepository = new MockTaskRepository();

  beforeEach(() => {
    service = new GetTaskByIdService(taskRepository);
  });

  describe('正常系', () => {
    const taskId = createId();

    beforeEach(() => {
      jest.spyOn(taskRepository, 'getById');
    });

    test('taskを取得できる', async () => {
      const actual = await service.handle(taskId);
      expect(actual).toEqual(mockTaskRepositoryReturnValues.getById);
    });

    test('指定したtaskIdで、TaskRepositoryからtask取得が行われる', async () => {
      await service.handle(taskId);
      expect(taskRepository.getById).toHaveBeenCalledWith(taskId);
    });
  });
});
