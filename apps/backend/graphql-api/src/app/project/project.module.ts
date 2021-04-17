import {
  GET_ADMIN_SERVICE,
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  ListProjectsService,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_PROJECTS_SERVICE,
  LIST_USERS_BY_PROJECT_ID_SERVICE,
} from '@bison/backend/application';
import { PROJECT_REPOSITORY } from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';
import {
  MockGetAdminService,
  MockGetBacklogByProjectIdService,
  MockListBoardsByProjectIdService,
  MockListUsersByProjectIdService,
  MockProjectRepository,
} from './testing/mock';

@Module({
  providers: [
    ProjectResolver,
    {
      provide: LIST_PROJECTS_SERVICE,
      useClass: ListProjectsService,
    },
    {
      provide: PROJECT_REPOSITORY,
      useValue: new MockProjectRepository(),
    },
    {
      provide: GET_BACKLOG_BY_PROJECT_ID_SERVICE,
      useValue: new MockGetBacklogByProjectIdService(),
    },
    {
      provide: LIST_BOARDS_BY_PROJECT_ID_SERVICE,
      useValue: new MockListBoardsByProjectIdService(),
    },
    {
      provide: LIST_USERS_BY_PROJECT_ID_SERVICE,
      useValue: new MockListUsersByProjectIdService(),
    },
    {
      provide: GET_ADMIN_SERVICE,
      useValue: new MockGetAdminService(),
    },
  ],
})
export class ProjectModule {}
