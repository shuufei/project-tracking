import { GET_PROJECT_BY_BOARD_ID_SERVICE } from '@bison/backend/application';
import { Module } from '@nestjs/common';
import { MockGetProjectByBoardIdService } from '../../../mock';
import { BoardResolver } from './board.resolver';

@Module({
  providers: [
    BoardResolver,
    {
      provide: GET_PROJECT_BY_BOARD_ID_SERVICE,
      useClass: MockGetProjectByBoardIdService,
    },
  ],
})
export class BoardModule {}
