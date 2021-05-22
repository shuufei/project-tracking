import {
  GetBoardByIdAndUserService,
  GET_BOARD_BY_ID_AND_USER_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  ListTaskGroupsByBoardIdService,
  LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE,
  MockGetProjectByBoardIdService,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  CanAccessProjectService,
  CAN_ACCESS_PROJECT_SERVICE,
  MockBoardRepository,
  MockProjectRepository,
  MockTaskGroupRepository,
  PROJECT_REPOSITORY,
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
    {
      provide: GET_BOARD_BY_ID_AND_USER_SERVICE,
      useClass: GetBoardByIdAndUserService,
    },
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
  imports: [ParseUserPipeModule],
})
export class BoardModule {}
