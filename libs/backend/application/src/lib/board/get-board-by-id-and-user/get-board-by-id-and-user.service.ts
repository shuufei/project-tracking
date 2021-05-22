import type {
  IBoardRepository,
  ICanAccessProjectService,
} from '@bison/backend/domain';
import {
  BOARD_REPOSITORY,
  CAN_ACCESS_PROJECT_SERVICE,
} from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import { IGetBoardByIdAndUserService } from './get-board-by-id-and-user.service.interface';

export class GetBoardByIdAndUserService implements IGetBoardByIdAndUserService {
  constructor(
    @Inject(BOARD_REPOSITORY) private boardRepository: IBoardRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private canAccessProjectService: ICanAccessProjectService
  ) {}

  async handle(
    ...args: Parameters<IGetBoardByIdAndUserService['handle']>
  ): ReturnType<IGetBoardByIdAndUserService['handle']> {
    const [id, reqUser] = args;
    const board = await this.boardRepository.getById(id);
    const canAccessProject = await this.canAccessProjectService.handle(
      reqUser.id,
      board.projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    return board;
  }
}
