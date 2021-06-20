import type {
  IBoardRepository,
  ICanAccessProjectService,
  ISubtaskRepository,
  ITaskRepository,
} from '@bison/backend/domain';
import {
  BOARD_REPOSITORY,
  CAN_ACCESS_PROJECT_SERVICE,
  SUBTASK_REPOSITORY,
  TASK_REPOSITORY,
} from '@bison/backend/domain';
import { createSubtask } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { ICreateSubtaskService } from './create-subtask.service.interface';

export class CreateSubtaskService implements ICreateSubtaskService {
  constructor(
    @Inject(SUBTASK_REPOSITORY)
    private readonly subtaskRepository: ISubtaskRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService,
    @Inject(TASK_REPOSITORY) private readonly taskRepository: ITaskRepository,
    @Inject(BOARD_REPOSITORY) private readonly boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<ICreateSubtaskService['handle']>
  ): ReturnType<ICreateSubtaskService['handle']> {
    const [input, user] = args;
    const task = await this.taskRepository.getById(input.taskId);
    const board = await this.boardRepository.getById(task.boardId);
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    const subtask = createSubtask(
      input.title,
      input.taskId,
      input.assignUserId,
      input.description,
      input.scheduledTimeSec
    );
    await this.subtaskRepository.create(subtask);
    return subtask;
  }
}
