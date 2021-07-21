import type {
  IBoardRepository,
  ICanAccessProjectService,
} from '@bison/backend/domain';
import {
  BOARD_REPOSITORY,
  CAN_ACCESS_PROJECT_SERVICE,
} from '@bison/backend/domain';
import { createBoard } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { ICreateBoardService } from './create-board.service.interface';

export class CreateBoardService implements ICreateBoardService {
  constructor(
    @Inject(BOARD_REPOSITORY)
    private readonly boardRepository: IBoardRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private readonly canAccessProjectService: ICanAccessProjectService
  ) {}

  async handle(
    ...args: Parameters<ICreateBoardService['handle']>
  ): ReturnType<ICreateBoardService['handle']> {
    const [input, user] = args;
    const canAccessProject = await this.canAccessProjectService.handle(
      user.id,
      input.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    const board = createBoard(input.name, input.projectId, input.description);
    await this.boardRepository.create(board);
    return board;
  }
}
