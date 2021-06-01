import type { ITaskRepository } from '@bison/backend/domain';
import { TASK_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetTaskByIdService } from './get-task-by-id.service.interface';

export class GetTaskByIdService implements IGetTaskByIdService {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository
  ) {}

  async handle(
    ...args: Parameters<IGetTaskByIdService['handle']>
  ): ReturnType<IGetTaskByIdService['handle']> {
    const [taskId] = args;
    return this.taskRepository.getById(taskId);
  }
}
