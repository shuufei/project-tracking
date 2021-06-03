import {
  GetBoardByIdService,
  GetProjectByBoardIdService,
  GetTaskGroupByIdService,
  GetUserByIdService,
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_TASK_GROUP_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  ListSubtasksByTaskIdService,
  LIST_SUBTASKS_BY_TASK_ID_SERVICE,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  MockBoardRepository,
  MockProjectRepository,
  MockSubtaskRepository,
  MockTaskGroupRepository,
  MockUserRepository,
  PROJECT_REPOSITORY,
  SUBTASK_REPOSITORY,
  TASK_GROUP_REPOSITORY,
  USER_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';

@Module({
  providers: [
    TaskResolver,
    {
      provide: GET_BOARD_BY_ID_SERVICE,
      useClass: GetBoardByIdService,
    },
    {
      provide: GET_PROJECT_BY_BOARD_ID_SERVICE,
      useClass: GetProjectByBoardIdService,
    },
    {
      provide: GET_USER_BY_ID_SERVICE,
      useClass: GetUserByIdService,
    },
    {
      provide: GET_TASK_GROUP_BY_ID_SERVICE,
      useClass: GetTaskGroupByIdService,
    },
    {
      provide: LIST_SUBTASKS_BY_TASK_ID_SERVICE,
      useClass: ListSubtasksByTaskIdService,
    },
    {
      provide: BOARD_REPOSITORY,
      useClass: MockBoardRepository,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: MockProjectRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
    {
      provide: TASK_GROUP_REPOSITORY,
      useClass: MockTaskGroupRepository,
    },
    {
      provide: SUBTASK_REPOSITORY,
      useClass: MockSubtaskRepository,
    },
  ],
})
export class TaskModule {}
