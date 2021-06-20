import { createId } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { IBoardRepository } from './board-repository.interface';

export const mockBoardRepositoryReturnValues: MockReturnValues<IBoardRepository> = {
  listByProjectId: {
    boards: [
      {
        id: 'board0001',
        name: 'board name 0001',
        description: 'board description 0001',
        projectId: 'project0001',
        tasksOrder: [
          {
            taskId: createId(),
            type: 'Task',
          },
          {
            taskId: createId(),
            type: 'TaskGroup',
          },
          {
            taskId: createId(),
            type: 'Task',
          },
        ],
      },
      {
        id: 'board0002',
        name: 'board name 0002',
        description: 'board description 0002',
        projectId: 'project0002',
        tasksOrder: [
          {
            taskId: createId(),
            type: 'Task',
          },
          {
            taskId: createId(),
            type: 'TaskGroup',
          },
          {
            taskId: createId(),
            type: 'Task',
          },
        ],
      },
      {
        id: 'board0003',
        name: 'board name 0003',
        projectId: 'project0003',
        tasksOrder: [
          {
            taskId: createId(),
            type: 'Task',
          },
          {
            taskId: createId(),
            type: 'TaskGroup',
          },
          {
            taskId: createId(),
            type: 'Task',
          },
        ],
      },
    ],
  },
  getById: {
    id: 'board0001',
    name: 'board name 0001',
    description: 'board description 0001',
    projectId: 'project0001',
    tasksOrder: [
      {
        taskId: createId(),
        type: 'Task',
      },
      {
        taskId: createId(),
        type: 'TaskGroup',
      },
      {
        taskId: createId(),
        type: 'Task',
      },
    ],
  },
  create: {
    id: 'board0001',
    name: 'board name 0001',
    description: 'board description 0001',
    projectId: 'project0001',
    tasksOrder: [
      {
        taskId: createId(),
        type: 'Task',
      },
      {
        taskId: createId(),
        type: 'TaskGroup',
      },
      {
        taskId: createId(),
        type: 'Task',
      },
    ],
  },
  delete: undefined,
  update: {
    id: 'board0001',
    name: 'board name 0001',
    description: 'board description 0001',
    projectId: 'project0001',
    tasksOrder: [
      {
        taskId: createId(),
        type: 'Task',
      },
      {
        taskId: createId(),
        type: 'TaskGroup',
      },
      {
        taskId: createId(),
        type: 'Task',
      },
    ],
  },
};

export class MockBoardRepository implements IBoardRepository {
  async listByProjectId() {
    return mockBoardRepositoryReturnValues.listByProjectId;
  }

  async getById() {
    return mockBoardRepositoryReturnValues.getById;
  }

  async create() {
    return mockBoardRepositoryReturnValues.create;
  }

  async delete() {
    return mockBoardRepositoryReturnValues.delete;
  }

  async update() {
    return mockBoardRepositoryReturnValues.update;
  }
}
