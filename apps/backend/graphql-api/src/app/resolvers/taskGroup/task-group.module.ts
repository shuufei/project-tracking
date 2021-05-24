import {
  GetBoardByIdService,
  GET_BOARD_BY_ID_SERVICE,
} from '@bison/backend/application';
import { BOARD_REPOSITORY, MockBoardRepository } from '@bison/backend/domain';
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
  ],
})
export class TaskGroupModule {}
