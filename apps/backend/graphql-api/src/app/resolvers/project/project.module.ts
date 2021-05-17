import {
  GET_ADMIN_SERVICE,
  ListProjectsService,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
  LIST_PROJECTS_SERVICE,
  MockGetAdminService,
  MockListBoardsByProjectIdService,
  MockListMembersService,
} from '@bison/backend/application';
import {
  MockProjectRepository,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';

@Module({
  providers: [
    ProjectResolver,
    {
      provide: LIST_PROJECTS_SERVICE,
      useClass: ListProjectsService,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: MockProjectRepository,
    },
    {
      provide: LIST_BOARDS_BY_PROJECT_ID_SERVICE,
      useClass: MockListBoardsByProjectIdService,
    },
    {
      provide: LIST_MEMBERS_SERVICE,
      useClass: MockListMembersService,
    },
    {
      provide: GET_ADMIN_SERVICE,
      useClass: MockGetAdminService,
    },
  ],
})
export class ProjectModule {}
