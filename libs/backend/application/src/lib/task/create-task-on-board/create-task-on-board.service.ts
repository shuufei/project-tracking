import type {
  IBoardRepository,
  ICanAccessProjectService,
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
import type { ICreateTaskOnBoardService } from './create-task-on-board.service.interface';

export class CreateTaskOnBoardService implements ICreateTaskOnBoardService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService,
    @Inject(BOARD_REPOSITORY) private readonly boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<ICreateTaskOnBoardService['handle']>
  ): ReturnType<ICreateTaskOnBoardService['handle']> {
    const [input, user] = args;
    const board = await this.boardRepository.getById(input.boardId);
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
      input.boardId,
      input.description
    );
    return this.taskRepository.create(task);
  }
}
