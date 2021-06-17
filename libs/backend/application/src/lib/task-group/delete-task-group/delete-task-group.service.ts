import type { ITaskGroupRepository } from '@bison/backend/domain';
import { TASK_GROUP_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IDeleteTaskGroupService } from './delete-task-group.service.interface';

export class DeleteTaskGroupService implements IDeleteTaskGroupService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private readonly taskGroupRepository: ITaskGroupRepository
  ) {}

  async handle(
    ...args: Parameters<IDeleteTaskGroupService['handle']>
  ): ReturnType<IDeleteTaskGroupService['handle']> {
    const [id] = args;
    const taskGroup = await this.taskGroupRepository.getById(id);
    this.taskGroupRepository.delete(id);
    return taskGroup;
  }
}
