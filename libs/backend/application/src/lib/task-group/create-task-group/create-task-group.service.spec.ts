import { MockTaskGroupRepository } from '@bison/backend/domain';
import { STATUS } from '@bison/shared/domain';
import { CreateTaskGroupService } from './create-task-group.service';
import { CreateTaskGroupServiceInput } from './create-task-group.service.interface';

describe('CreateTaskGroupService', () => {
  let service: CreateTaskGroupService;
  const taskGroupRepository = new MockTaskGroupRepository();

  beforeEach(() => {
    service = new CreateTaskGroupService(taskGroupRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const input: CreateTaskGroupServiceInput = {
      title: 'taskGroup title 0001',
      description: 'taskGroup description 0001',
      assignUserId: 'user0001',
      boardId: 'board0001',
      scheduledTimeSec: 3600,
    };
    beforeEach(() => {
      jest.spyOn(taskGroupRepository, 'create');
    });
    test('taskGroupを作成できる', async () => {
      await service.handle(input);
      expect(taskGroupRepository.create).toHaveBeenCalledWith({
        ...input,
        id: expect.anything(),
        status: STATUS.Todo,
        tasksOrder: [],
      });
    });
    test('taskGroupを取得できる', async () => {
      const taskGroup = await service.handle(input);
      expect(taskGroup).toEqual({
        ...input,
        id: expect.anything(),
        status: STATUS.Todo,
        tasksOrder: [],
      });
    });
  });
});
