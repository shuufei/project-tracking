import {
  CreateTaskOnBoardService,
  CreateTaskOnTaskGroupService,
  CREATE_TASK_ON_BOARD_SERVICE,
  CREATE_TASK_ON_TASK_GROUP_SERVICE,
  DeleteTaskService,
  DELETE_TASK_SERVICE,
  GetBoardByIdService,
  GetProjectByBoardIdService,
  GetTaskByIdService,
  GetTaskGroupByIdService,
  GetUserByIdService,
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_TASK_BY_ID_SERVICE,
  GET_TASK_GROUP_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  ListSubtasksByTaskIdService,
  LIST_SUBTASKS_BY_TASK_ID_SERVICE,
  UpdateTaskService,
  UPDATE_TASK_SERVICE,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  CanAccessProjectService,
  CAN_ACCESS_PROJECT_SERVICE,
  MockBoardRepository,
  MockSubtaskRepository,
  MockTaskRepository,
  MockUserRepository,
  PROJECT_REPOSITORY,
  SUBTASK_REPOSITORY,
  TASK_GROUP_REPOSITORY,
  TASK_REPOSITORY,
  USER_REPOSITORY,
} from '@bison/backend/domain';
import {
  ProjectRepository,
  TaskGroupRepository,
} from '@bison/backend/infrastructure/repository';
import { Module } from '@nestjs/common';
import { ParseUserPipeModule } from '../../pipes/parse-user/parse-user.module';
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
      useClass: ProjectRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
    {
      provide: TASK_GROUP_REPOSITORY,
      useClass: TaskGroupRepository,
    },
    {
      provide: SUBTASK_REPOSITORY,
      useClass: MockSubtaskRepository,
    },
    {
      provide: TASK_REPOSITORY,
      useClass: MockTaskRepository,
    },
    {
      provide: CREATE_TASK_ON_TASK_GROUP_SERVICE,
      useClass: CreateTaskOnTaskGroupService,
    },
    {
      provide: CREATE_TASK_ON_BOARD_SERVICE,
      useClass: CreateTaskOnBoardService,
    },
    {
      provide: UPDATE_TASK_SERVICE,
      useClass: UpdateTaskService,
    },
    {
      provide: DELETE_TASK_SERVICE,
      useClass: DeleteTaskService,
    },
    {
      provide: CAN_ACCESS_PROJECT_SERVICE,
      useClass: CanAccessProjectService,
    },
    {
      provide: GET_TASK_BY_ID_SERVICE,
      useClass: GetTaskByIdService,
    },
  ],
  imports: [ParseUserPipeModule],
})
export class TaskModule {}
