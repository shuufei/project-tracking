import { createId, STATUS } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { ITaskRepository } from './task-repository.interface';

export const mockTaskRepositoryReturnValues: MockReturnValues<ITaskRepository> = {
  listByTaskGroupId: {
    tasks: [
      {
        id: createId(),
        title: 'task title 0001',
        description: 'task description 0001',
        status: STATUS.Todo,
        assignUserId: createId(),
        boardId: createId(),
        workTimeSec: 60 * 60 * 8,
        subtasksOrder: [],
        createdAt: new Date().valueOf(),
      },
      {
        id: createId(),
        title: 'task title 0002',
        description: 'task description 0002',
        status: STATUS.Todo,
        assignUserId: createId(),
        boardId: createId(),
        taskGroupId: createId(),
        workTimeSec: 0,
        scheduledTimeSec: 3600,
        subtasksOrder: [createId(), createId()],
        createdAt: new Date().valueOf(),
      },
      {
        id: createId(),
        title: 'task title 0003',
        description: 'task description 0003',
        status: STATUS.Inprogress,
        assignUserId: createId(),
        boardId: createId(),
        workTimeSec: 500,
        subtasksOrder: [createId()],
        createdAt: new Date().valueOf(),
      },
    ],
  },
  listSoloTasksByBoardId: {
    tasks: [
      {
        id: createId(),
        title: 'task title 0001',
        description: 'task description 0001',
        status: STATUS.Todo,
        assignUserId: createId(),
        boardId: createId(),
        workTimeSec: 60 * 60 * 3.5,
        subtasksOrder: [],
        createdAt: new Date().valueOf(),
      },
      {
        id: createId(),
        title: 'task title 0002',
        description: 'task description 0002',
        status: STATUS.Todo,
        assignUserId: createId(),
        boardId: createId(),
        taskGroupId: createId(),
        workTimeSec: 0,
        scheduledTimeSec: 3600,
        subtasksOrder: [createId(), createId()],
        createdAt: new Date().valueOf(),
      },
      {
        id: createId(),
        title: 'task title 0003',
        description: 'task description 0003',
        status: STATUS.Inprogress,
        assignUserId: createId(),
        boardId: createId(),
        workTimeSec: 500,
        subtasksOrder: [createId()],
        createdAt: new Date().valueOf(),
      },
    ],
  },
  getById: {
    id: createId(),
    title: 'task title 0001',
    description: 'task description 0001',
    status: STATUS.Todo,
    assignUserId: createId(),
    boardId: createId(),
    workTimeSec: 0,
    subtasksOrder: [],
    createdAt: new Date().valueOf(),
  },
  create: {
    id: createId(),
    title: 'task title 0001',
    description: 'task description 0001',
    status: STATUS.Todo,
    assignUserId: createId(),
    boardId: createId(),
    workTimeSec: 0,
    subtasksOrder: [],
    createdAt: new Date().valueOf(),
  },
  update: {
    id: createId(),
    title: 'task title 0001',
    description: 'task description 0001',
    status: STATUS.Todo,
    assignUserId: createId(),
    boardId: createId(),
    workTimeSec: 0,
    subtasksOrder: [],
    createdAt: new Date().valueOf(),
  },
  delete: undefined,
};

export class MockTaskRepository implements ITaskRepository {
  async listByTaskGroupId() {
    return mockTaskRepositoryReturnValues.listByTaskGroupId;
  }

  async listSoloTasksByBoardId() {
    return mockTaskRepositoryReturnValues.listSoloTasksByBoardId;
  }

  async getById() {
    return mockTaskRepositoryReturnValues.getById;
  }

  async create() {
    return mockTaskRepositoryReturnValues.create;
  }

  async update() {
    return mockTaskRepositoryReturnValues.update;
  }

  async delete() {
    return mockTaskRepositoryReturnValues.delete;
  }
}
