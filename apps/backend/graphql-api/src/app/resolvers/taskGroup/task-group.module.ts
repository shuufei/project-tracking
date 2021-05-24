import {
  GetBoardByIdService,
  GetProjectByBoardIdService,
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  MockBoardRepository,
  MockProjectRepository,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { TaskGroupResolver } from './task-group.resolver';

@Module({
  providers: [
    TaskGroupResolver,
    {
      provide: GET_BOARD_BY_ID_SERVICE,
      useClass: GetBoardByIdService,
    },
    {
      provide: BOARD_REPOSITORY,
      useClass: MockBoardRepository,
    },
    {
      provide: GET_PROJECT_BY_BOARD_ID_SERVICE,
      useClass: GetProjectByBoardIdService,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: MockProjectRepository,
    },
  ],
})
export class TaskGroupModule {}
