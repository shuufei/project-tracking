import { createId, STATUS } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { ITaskGroupRepository } from './task-group-repository.interface';

export const mockTaskGroupRepositoryReturnValues: MockReturnValues<ITaskGroupRepository> = {
  listByBoardId: {
    taskGroups: [
      {
        id: createId(),
        title: 'task group title 0001',
        description: 'task group description 0001',
        status: STATUS.Todo,
        assignUserId: createId(),
        boardId: createId(),
        tasksOrder: [],
      },
      {
        id: createId(),
        title: 'task group title 0002',
        description: 'task group description 0002',
        status: STATUS.Inprogress,
        assignUserId: createId(),
        boardId: createId(),
        tasksOrder: [],
      },
      {
        id: createId(),
        title: 'task group title 0002',
        description: 'task group description 0002',
        status: STATUS.Confirm,
        assignUserId: createId(),
        boardId: createId(),
        tasksOrder: [],
      },
    ],
  },
  getById: {
    id: createId(),
    title: 'task group title 0002',
    description: 'task group description 0002',
    status: STATUS.Confirm,
    assignUserId: createId(),
    boardId: createId(),
    tasksOrder: [],
  },
};

export class MockTaskGroupRepository implements ITaskGroupRepository {
  async listByBoardId() {
    return mockTaskGroupRepositoryReturnValues.listByBoardId;
  }

  async getById() {
    return mockTaskGroupRepositoryReturnValues.getById;
  }
}
