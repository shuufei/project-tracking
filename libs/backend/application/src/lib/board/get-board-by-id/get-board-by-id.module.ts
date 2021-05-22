import {
  BOARD_REPOSITORY,
  CanAccessProjectService,
  CAN_ACCESS_PROJECT_SERVICE,
  MockBoardRepository,
  MockProjectRepository,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { GetBoardByIdService } from './get-board-by-id.service';
import { GET_BOARD_BY_ID_SERVICE } from './get-board-by-id.service.interface';

const GetBoardByIdServiceProvider = {
  provide: GET_BOARD_BY_ID_SERVICE,
  useClass: GetBoardByIdService,
};

@Module({
  providers: [
    GetBoardByIdServiceProvider,
    {
      provide: CAN_ACCESS_PROJECT_SERVICE,
      useClass: CanAccessProjectService,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: MockProjectRepository,
    },
    {
      provide: BOARD_REPOSITORY,
      useClass: MockBoardRepository,
    },
  ],
  exports: [GetBoardByIdServiceProvider],
})
export class GetBoardByIdModule {}
