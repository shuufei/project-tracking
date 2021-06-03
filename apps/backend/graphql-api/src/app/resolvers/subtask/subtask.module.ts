import {
  GetTaskByIdService,
  GetUserByIdService,
  GET_TASK_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
} from '@bison/backend/application';
import {
  MockTaskRepository,
  MockUserRepository,
  TASK_REPOSITORY,
  USER_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { SubtaskResolver } from './subtask.resolver';

@Module({
  providers: [
    SubtaskResolver,
    {
      provide: TASK_REPOSITORY,
      useClass: MockTaskRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
    {
      provide: GET_TASK_BY_ID_SERVICE,
      useClass: GetTaskByIdService,
    },
    {
      provide: GET_USER_BY_ID_SERVICE,
      useClass: GetUserByIdService,
    },
  ],
})
export class SubtaskModule {}
