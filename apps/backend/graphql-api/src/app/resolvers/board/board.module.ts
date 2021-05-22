import {
  GetBoardByIdModule,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  ListTaskGroupsByBoardIdService,
  LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE,
  MockGetProjectByBoardIdService,
} from '@bison/backend/application';
import {
  MockTaskGroupRepository,
  TASK_GROUP_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { ParseUserPipeModule } from '../../pipes/parse-user/parse-user.module';
import { BoardResolver } from './board.resolver';

@Module({
  providers: [
    BoardResolver,
    {
      provide: GET_PROJECT_BY_BOARD_ID_SERVICE,
      useClass: MockGetProjectByBoardIdService,
    },
    {
      provide: LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE,
      useClass: ListTaskGroupsByBoardIdService,
    },
    {
      provide: TASK_GROUP_REPOSITORY,
      useClass: MockTaskGroupRepository,
    },
  ],
  imports: [ParseUserPipeModule, GetBoardByIdModule],
})
export class BoardModule {}
