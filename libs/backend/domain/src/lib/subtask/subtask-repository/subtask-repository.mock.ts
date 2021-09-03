import { createId } from '@bison/shared/domain';
import { MockReturnValues } from '@bison/types/testing';
import { ISubtaskRepository } from './subtask-repository.interface';

export const mockSubtaskRepositoryReturnValues: MockReturnValues<ISubtaskRepository> = {
  listByTaskId: {
    subtasks: [
      {
        id: createId(),
        title: 'subtask title 0001',
        description: 'subtask description 0001',
        isDone: false,
        assignUserId: createId(),
        workTimeSec: 60 * 60 * 2,
        scheduledTimeSec: 60 * 60,
        taskId: createId(),
        createdAt: new Date().valueOf(),
      },
      {
        id: createId(),
        title: 'subtask title 0002',
        description: 'subtask description 0002',
        isDone: true,
        workTimeSec: 60 * 60 * 2,
        scheduledTimeSec: 60 * 60,
        taskId: createId(),
        createdAt: new Date().valueOf(),
      },
      {
        id: createId(),
        title: 'subtask title 0003',
        description: 'subtask description 0003',
        isDone: false,
        assignUserId: createId(),
        workTimeSec: 60 * 60 * 2,
        taskId: createId(),
        createdAt: new Date().valueOf(),
      },
    ],
  },
  getById: {
    id: createId(),
    title: 'subtask title 0001',
    description: 'subtask description 0001',
    isDone: false,
    assignUserId: createId(),
    workTimeSec: 60 * 60 * 2,
    scheduledTimeSec: 60 * 60,
    taskId: createId(),
    createdAt: new Date().valueOf(),
  },
  create: {
    id: createId(),
    title: 'subtask title 0001',
    description: 'subtask description 0001',
    isDone: false,
    assignUserId: createId(),
    workTimeSec: 60 * 60 * 2,
    scheduledTimeSec: 60 * 60,
    taskId: createId(),
    createdAt: new Date().valueOf(),
  },
  update: {
    id: createId(),
    title: 'subtask title 0001',
    description: 'subtask description 0001',
    isDone: false,
    assignUserId: createId(),
    workTimeSec: 60 * 60 * 2,
    scheduledTimeSec: 60 * 60,
    taskId: createId(),
    createdAt: new Date().valueOf(),
  },
  delete: undefined,
};

export class MockSubtaskRepository implements ISubtaskRepository {
  async listByTaskId() {
    return mockSubtaskRepositoryReturnValues.listByTaskId;
  }

  async getById() {
    return mockSubtaskRepositoryReturnValues.getById;
  }

  async create() {
    return mockSubtaskRepositoryReturnValues.create;
  }

  async update() {
    return mockSubtaskRepositoryReturnValues.update;
  }

  async delete() {
    return mockSubtaskRepositoryReturnValues.delete;
  }
}
