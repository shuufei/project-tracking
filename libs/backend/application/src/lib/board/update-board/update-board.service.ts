import type {
  IBoardRepository,
  ICanAccessProjectService,
} from '@bison/backend/domain';
import {
  BOARD_REPOSITORY,
  CAN_ACCESS_PROJECT_SERVICE,
} from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { IUpdateBoardService } from './update-board.service.interface';

export class UpdateBoardService implements IUpdateBoardService {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService
  ) {}

  async handle(
    ...args: Parameters<IUpdateBoardService['handle']>
  ): ReturnType<IUpdateBoardService['handle']> {
    const [board, user] = args;
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    return this.boardRepository.update(board);
  }
}
