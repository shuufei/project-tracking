import {
  MockTaskGroupRepository,
  mockTaskGroupRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { GetTaskGroupByIdService } from './get-task-group-by-id.service';

describe('GetTaskGroupByIdService', () => {
  let service: GetTaskGroupByIdService;
  const taskGroupRepository = new MockTaskGroupRepository();

  beforeEach(() => {
    service = new GetTaskGroupByIdService(taskGroupRepository);
  });

  describe('正常系', () => {
    const taskGroupId = createId();

    beforeEach(() => {
      jest.spyOn(taskGroupRepository, 'getById');
    });

    test('taskGroupを取得できる', async () => {
      const taskGroup = await service.handle(taskGroupId);
      expect(taskGroup).toEqual(mockTaskGroupRepositoryReturnValues.getById);
    });

    test('指定したtaskGroupIdで、TaskGroupRepositoryからtaskGroupの取得が行われる', async () => {
      await service.handle(taskGroupId);
      expect(taskGroupRepository.getById).toHaveBeenCalledWith(taskGroupId);
    });
  });
});
