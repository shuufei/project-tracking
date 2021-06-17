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
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { IUpdateTaskGroupService } from './update-task-group.service.interface';

export class UpdateTaskGroupService implements IUpdateTaskGroupService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private readonly taskGroupRepository: ITaskGroupRepository,
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService
  ) {}

  async handle(
    ...args: Parameters<IUpdateTaskGroupService['handle']>
  ): ReturnType<IUpdateTaskGroupService['handle']> {
    const [taskGroup, user] = args;
    const board = await this.boardRepository.getById(taskGroup.boardId);
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    await this.taskGroupRepository.update(taskGroup);
    return taskGroup;
  }
}
