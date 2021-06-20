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
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { IDeleteTaskService } from './delete-task.service.interface';

export class DeleteTaskService implements IDeleteTaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService,
    @Inject(BOARD_REPOSITORY) private readonly boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<IDeleteTaskService['handle']>
  ): ReturnType<IDeleteTaskService['handle']> {
    const [id, user] = args;
    const task = await this.taskRepository.getById(id);
    const board = await this.boardRepository.getById(task.boardId);
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    await this.taskRepository.delete(id);
    return task;
  }
}
