import type { ITaskGroupRepository } from '@bison/backend/domain';
import { TASK_GROUP_REPOSITORY } from '@bison/backend/domain';
import { createTaskGroup } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import type { ICreateTaskGroupService } from './create-task-group.service.interface';

export class CreateTaskGroupService implements ICreateTaskGroupService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private readonly taskRepository: ITaskGroupRepository
  ) {}

  async handle(
    ...args: Parameters<ICreateTaskGroupService['handle']>
  ): ReturnType<ICreateTaskGroupService['handle']> {
    const [input] = args;
    const taskGroup = createTaskGroup(
      input.title,
      input.assignUserId,
      input.boardId,
      input.description,
      input.scheduledTimeSec
    );
    await this.taskRepository.create(taskGroup);
    return taskGroup;
  }
}
