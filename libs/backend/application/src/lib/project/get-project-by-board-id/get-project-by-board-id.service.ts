import type {
  IBoardRepository,
  IProjectRepository,
} from '@bison/backend/domain';
import { BOARD_REPOSITORY, PROJECT_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetProjectByBoardIdService } from './get-project-by-board-id.service.interface';

export class GetProjectByBoardIdService implements IGetProjectByBoardIdService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepository: IProjectRepository,
    @Inject(BOARD_REPOSITORY) private boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<IGetProjectByBoardIdService['handle']>
  ): ReturnType<IGetProjectByBoardIdService['handle']> {
    const [boardId] = args;
    const board = await this.boardRepository.getById(boardId);
    return this.projectRepository.getById(board.projectId);
  }
}
