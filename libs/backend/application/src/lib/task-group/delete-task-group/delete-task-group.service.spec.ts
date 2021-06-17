import {
  MockTaskGroupRepository,
  mockTaskGroupRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { DeleteTaskGroupService } from './delete-task-group.service';

describe('DeleteTaskGroupService', () => {
  let service: DeleteTaskGroupService;
  const taskGroupRepository = new MockTaskGroupRepository();

  beforeEach(() => {
    service = new DeleteTaskGroupService(taskGroupRepository);
  });

  describe('正常系', () => {
    const taskGroupId = createId();
    beforeEach(() => {
      jest.spyOn(taskGroupRepository, 'delete');
    });
    test('taskGroupを削除できる', async () => {
      await service.handle(taskGroupId);
      expect(taskGroupRepository.delete).toHaveBeenCalledWith(taskGroupId);
    });
    test('taskGroupを取得できる', async () => {
      const actual = await service.handle(taskGroupId);
      expect(actual).toEqual(mockTaskGroupRepositoryReturnValues.getById);
    });
  });
});
