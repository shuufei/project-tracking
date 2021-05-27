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
      },
      {
        id: createId(),
        title: 'subtask title 0002',
        description: 'subtask description 0002',
        isDone: true,
        workTimeSec: 60 * 60 * 2,
        scheduledTimeSec: 60 * 60,
        taskId: createId(),
      },
      {
        id: createId(),
        title: 'subtask title 0003',
        description: 'subtask description 0003',
        isDone: false,
        assignUserId: createId(),
        workTimeSec: 60 * 60 * 2,
        taskId: createId(),
      },
    ],
  },
};

export class MockSubtaskRepository implements ISubtaskRepository {
  async listByTaskId() {
    return mockSubtaskRepositoryReturnValues.listByTaskId;
  }
}
