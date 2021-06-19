import type {
  IBoardRepository,
  ICanAccessProjectService,
  ITaskGroupRepository,
  ITaskRepository,
} from '@bison/backend/domain';
import {
  BOARD_REPOSITORY,
  CAN_ACCESS_PROJECT_SERVICE,
  TASK_REPOSITORY,
} from '@bison/backend/domain';
import { createTask } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { ICreateTaskOnTaskGroupService } from './create-task-on-task-group.service.interface';

export class CreateTaskOnTaskGroupService
  implements ICreateTaskOnTaskGroupService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService,
    @Inject(BOARD_REPOSITORY)
    private readonly taskGroupRepository: ITaskGroupRepository,
    @Inject(BOARD_REPOSITORY) private readonly boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<ICreateTaskOnTaskGroupService['handle']>
  ): ReturnType<ICreateTaskOnTaskGroupService['handle']> {
    const [input, user] = args;
    const taskGroup = await this.taskGroupRepository.getById(input.taskGroupId);
    const board = await this.boardRepository.getById(taskGroup.boardId);
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    const task = createTask(
      input.title,
      input.assignUserId,
      board.id,
      input.description,
      input.taskGroupId
    );
    return this.taskRepository.create(task);
  }
}
