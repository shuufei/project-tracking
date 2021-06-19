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
import type { IDeleteBoardService } from './delete-board.service.interface';

export class DeleteBoardService implements IDeleteBoardService {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService
  ) {}

  async handle(
    ...args: Parameters<IDeleteBoardService['handle']>
  ): ReturnType<IDeleteBoardService['handle']> {
    const [id, user] = args;
    const board = await this.boardRepository.getById(id);
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    await this.boardRepository.delete(id);
    return board;
  }
}
