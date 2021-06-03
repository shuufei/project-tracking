import type { ISubtaskRepository } from '@bison/backend/domain';
import { SUBTASK_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListSubtasksByTaskIdService } from './list-subtasks-by-task-id.service.interface';

export class ListSubtasksByTaskIdService
  implements IListSubtasksByTaskIdService {
  constructor(
    @Inject(SUBTASK_REPOSITORY)
    private subtaskRepository: ISubtaskRepository
  ) {}

  async handle(
    ...args: Parameters<IListSubtasksByTaskIdService['handle']>
  ): ReturnType<IListSubtasksByTaskIdService['handle']> {
    const [taskId] = args;
    return this.subtaskRepository.listByTaskId(taskId);
  }
}
