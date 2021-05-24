import type { IBoardRepository } from '@bison/backend/domain';
import { BOARD_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { IGetBoardByIdService } from './get-board-by-id.service.interface';

export class GetBoardByIdService implements IGetBoardByIdService {
  constructor(
    @Inject(BOARD_REPOSITORY) private boardRepository: IBoardRepository
  ) {}

  async handle(
    ...args: Parameters<IGetBoardByIdService['handle']>
  ): ReturnType<IGetBoardByIdService['handle']> {
    const [id] = args;
    const board = await this.boardRepository.getById(id);
    return board;
  }
}
