import type { ITaskRepository } from '@bison/backend/domain';
import { TASK_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListTasksByTaskGroupIdService } from './list-tasks-by-task-group-id.service.interface';

export class ListTasksByTaskGroupIdService
  implements IListTasksByTaskGroupIdService {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository
  ) {}

  async handle(
    ...args: Parameters<IListTasksByTaskGroupIdService['handle']>
  ): ReturnType<IListTasksByTaskGroupIdService['handle']> {
    const [taskGroupId] = args;
    return this.taskRepository.listByTaskGroupId(taskGroupId);
  }
}
