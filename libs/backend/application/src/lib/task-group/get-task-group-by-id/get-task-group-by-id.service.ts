import type { ITaskGroupRepository } from '@bison/backend/domain';
import { TASK_GROUP_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetTaskGroupByIdService } from './get-task-group-by-id.service.interface';

export class GetTaskGroupByIdService implements IGetTaskGroupByIdService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private taskGroupRepository: ITaskGroupRepository
  ) {}

  async handle(
    ...args: Parameters<IGetTaskGroupByIdService['handle']>
  ): ReturnType<IGetTaskGroupByIdService['handle']> {
    const [id] = args;
    return this.taskGroupRepository.getById(id);
  }
}
