import type { IBoardRepository } from '@bison/backend/domain';
import { BOARD_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListBoardsByProjectIdService } from './interface/list-boards-by-project-id-service';

export class ListBoardsByProjectIdService
  implements IListBoardsByProjectIdService {
  constructor(
    @Inject(BOARD_REPOSITORY) private boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<IListBoardsByProjectIdService['handle']>
  ): ReturnType<IListBoardsByProjectIdService['handle']> {
    const [projectId] = args;
    return this.boardRepository.listByProjectId(projectId);
  }
}
