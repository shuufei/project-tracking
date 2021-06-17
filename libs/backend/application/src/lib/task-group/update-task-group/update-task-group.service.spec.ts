import { MockTaskGroupRepository } from '@bison/backend/domain';
import { STATUS, TaskGroup } from '@bison/shared/domain';
import { UpdateTaskGroupService } from './update-task-group.service';

describe('UpdateTaskGroupService', () => {
  let service: UpdateTaskGroupService;
  const taskGroupRepository = new MockTaskGroupRepository();

  beforeEach(() => {
    service = new UpdateTaskGroupService(taskGroupRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const taskGroup: TaskGroup = {
      id: 'taskGroup0001',
      title: 'taskGroup title 0001',
      description: 'taskGroup description 0001',
      status: STATUS.Confirm,
      assignUserId: 'user0001',
      boardId: 'board0001',
      tasksOrder: [],
    };
    beforeEach(() => {
      jest.spyOn(taskGroupRepository, 'update');
    });
    test('taskGroupを更新できる', async () => {
      await service.handle(taskGroup);
      expect(taskGroupRepository.update).toHaveBeenCalledWith(taskGroup);
    });
    test('taskGroupを取得できる', async () => {
      const actual = await service.handle(taskGroup);
      expect(actual).toEqual(taskGroup);
    });
  });
});
