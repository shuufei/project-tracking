import {
  GetBoardByIdService,
  GetProjectByBoardIdService,
  GetUserByIdService,
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  MockBoardRepository,
  MockProjectRepository,
  MockUserRepository,
  PROJECT_REPOSITORY,
  USER_REPOSITORY,
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
    {
      provide: GET_USER_BY_ID_SERVICE,
      useClass: GetUserByIdService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
  ],
})
export class TaskGroupModule {}
