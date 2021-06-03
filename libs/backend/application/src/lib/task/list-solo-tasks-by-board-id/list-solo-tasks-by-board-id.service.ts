import type { ITaskRepository } from '@bison/backend/domain';
import { TASK_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListSoloTasksByBoardIdService } from './list-solo-tasks-by-board-id.service.interface';

export class ListSoloTasksByBoardIdService
  implements IListSoloTasksByBoardIdService {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository
  ) {}

  async handle(
    ...args: Parameters<IListSoloTasksByBoardIdService['handle']>
  ): ReturnType<IListSoloTasksByBoardIdService['handle']> {
    const [boardId] = args;
    return this.taskRepository.listSoloTasksByBoardId(boardId);
  }
}
