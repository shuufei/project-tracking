import {
  CreateProjectService,
  CREATE_PROJECT_SERVICE,
  DeleteProjectService,
  DELETE_PROJECT_SERVICE,
  GetAdminService,
  GetProjectByIdAndUserService,
  GET_ADMIN_SERVICE,
  GET_PROJECT_BY_ID_AND_USER_SERVICE,
  ListBoardsByProjectIdService,
  ListMembersService,
  ListProjectsService,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
  LIST_PROJECTS_SERVICE,
  UpdateProjectService,
  UPDATE_PROJECT_SERVICE,
} from '@bison/backend/application';
import {
  BOARD_REPOSITORY,
  CanAccessProjectService,
  CanEditProjectService,
  CAN_ACCESS_PROJECT_SERVICE,
  CAN_EDIT_PROJECT_SERVICE,
  MockBoardRepository,
  MockProjectRepository,
  MockUserRepository,
  PROJECT_REPOSITORY,
  USER_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { ParseUserPipeModule } from '../../pipes/parse-user/parse-user.module';
import { ProjectResolver } from './project.resolver';

@Module({
  imports: [ParseUserPipeModule],
  providers: [
    ProjectResolver,
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: MockProjectRepository,
    },
    {
      provide: BOARD_REPOSITORY,
      useClass: MockBoardRepository,
    },
    {
      provide: LIST_PROJECTS_SERVICE,
      useClass: ListProjectsService,
    },
    {
      provide: LIST_BOARDS_BY_PROJECT_ID_SERVICE,
      useClass: ListBoardsByProjectIdService,
    },
    {
      provide: LIST_MEMBERS_SERVICE,
      useClass: ListMembersService,
    },
    {
      provide: GET_ADMIN_SERVICE,
      useClass: GetAdminService,
    },
    {
      provide: GET_PROJECT_BY_ID_AND_USER_SERVICE,
      useClass: GetProjectByIdAndUserService,
    },
    {
      provide: CAN_ACCESS_PROJECT_SERVICE,
      useClass: CanAccessProjectService,
    },
    {
      provide: CREATE_PROJECT_SERVICE,
      useClass: CreateProjectService,
    },
    {
      provide: CAN_EDIT_PROJECT_SERVICE,
      useClass: CanEditProjectService,
    },
    {
      provide: UPDATE_PROJECT_SERVICE,
      useClass: UpdateProjectService,
    },
    {
      provide: DELETE_PROJECT_SERVICE,
      useClass: DeleteProjectService,
    },
  ],
})
export class ProjectModule {}
