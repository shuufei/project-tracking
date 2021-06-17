import type { ITaskGroupRepository } from '@bison/backend/domain';
import { TASK_GROUP_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IUpdateTaskGroupService } from './update-task-group.service.interface';

export class UpdateTaskGroupService implements IUpdateTaskGroupService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private readonly taskGroupRepository: ITaskGroupRepository
  ) {}

  async handle(
    ...args: Parameters<IUpdateTaskGroupService['handle']>
  ): ReturnType<IUpdateTaskGroupService['handle']> {
    const [taskGroup] = args;
    await this.taskGroupRepository.update(taskGroup);
    return taskGroup;
  }
}
