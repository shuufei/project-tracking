import type {
  IBoardRepository,
  ICanAccessProjectService,
  ITaskGroupRepository,
} from '@bison/backend/domain';
import {
  BOARD_REPOSITORY,
  CAN_ACCESS_PROJECT_SERVICE,
  TASK_GROUP_REPOSITORY,
} from '@bison/backend/domain';
import { createTaskGroup } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { ICreateTaskGroupService } from './create-task-group.service.interface';

export class CreateTaskGroupService implements ICreateTaskGroupService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private readonly taskRepository: ITaskGroupRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService,
    @Inject(BOARD_REPOSITORY) private readonly boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<ICreateTaskGroupService['handle']>
  ): ReturnType<ICreateTaskGroupService['handle']> {
    const [input, user] = args;
    const board = await this.boardRepository.getById(input.boardId);
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
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
