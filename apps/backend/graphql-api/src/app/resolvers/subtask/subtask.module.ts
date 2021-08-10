import {
  CreateSubtaskService,
  CREATE_SUBTASK_SERVICE,
  DeleteSubtaskService,
  DELETE_SUBTASK_SERVICE,
  GetSubtaskByIdService,
  GetTaskByIdService,
  GetUserByIdService,
  GET_SUBTASK_BY_ID_SERVICE,
  GET_TASK_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  UpdateSubtaskService,
  UPDATE_SUBTASK_SERVICE,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  CanAccessProjectService,
  CAN_ACCESS_PROJECT_SERVICE,
  MockBoardRepository,
  MockProjectRepository,
  MockSubtaskRepository,
  MockTaskRepository,
  MockUserRepository,
  PROJECT_REPOSITORY,
  SUBTASK_REPOSITORY,
  TASK_REPOSITORY,
  USER_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { ParseUserPipeModule } from '../../pipes/parse-user/parse-user.module';
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
      provide: SUBTASK_REPOSITORY,
      useClass: MockSubtaskRepository,
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
      provide: GET_TASK_BY_ID_SERVICE,
      useClass: GetTaskByIdService,
    },
    {
      provide: GET_USER_BY_ID_SERVICE,
      useClass: GetUserByIdService,
    },
    {
      provide: CREATE_SUBTASK_SERVICE,
      useClass: CreateSubtaskService,
    },
    {
      provide: UPDATE_SUBTASK_SERVICE,
      useClass: UpdateSubtaskService,
    },
    {
      provide: DELETE_SUBTASK_SERVICE,
      useClass: DeleteSubtaskService,
    },
    {
      provide: CAN_ACCESS_PROJECT_SERVICE,
      useClass: CanAccessProjectService,
    },
    {
      provide: GET_SUBTASK_BY_ID_SERVICE,
      useClass: GetSubtaskByIdService,
    },
  ],
  imports: [ParseUserPipeModule],
})
export class SubtaskModule {}
