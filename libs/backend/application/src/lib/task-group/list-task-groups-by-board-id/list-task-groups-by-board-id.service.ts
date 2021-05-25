import type { ITaskGroupRepository } from '@bison/backend/domain';
import { TASK_GROUP_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListTaskGroupsByBoardIdService } from './list-task-groups-by-board-id.service.interface';

export class ListTaskGroupsByBoardIdService
  implements IListTaskGroupsByBoardIdService {
  constructor(
    @Inject(TASK_GROUP_REPOSITORY)
    private taskGroupRepository: ITaskGroupRepository
  ) {}

  async handle(
    ...args: Parameters<IListTaskGroupsByBoardIdService['handle']>
  ): ReturnType<IListTaskGroupsByBoardIdService['handle']> {
    const [boardId] = args;
    return this.taskGroupRepository.listByBoardId(boardId);
  }
}
