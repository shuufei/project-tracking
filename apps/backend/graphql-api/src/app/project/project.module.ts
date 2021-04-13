import {
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListUsersByProjectIdService,
  ListProjectsService,
  LIST_PROJECTS_SERVICE,
  LIST_USERS_BY_PROJECT_ID_SERVICE,
} from '@bison/backend/application';
import {
  IProjectRepository,
  ListResponse,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import type { Color } from '@bison/shared/domain';
import { Module } from '@nestjs/common';
import { LIST_BOARDS_BY_PROJECT_ID_SERVICE } from '../../../../../../libs/backend/application/src/lib/board/interface/list-boards-by-project-id-service';
import { getRandom } from '../util/get-random-number';
import { ProjectResolver } from './project.resolver';

class MockProjectRepository implements IProjectRepository {
  async list(): Promise<ListResponse> {
    return {
      edges: [
        {
          cursor: '',
          node: {
            id: `project${getRandom()}`,
            name: `project name ${getRandom()}`,
            description: `project description ${getRandom()}`,
            color: 'red' as Color,
          },
        },
        {
          cursor: '',
          node: {
            id: `project${getRandom()}`,
            name: `project name ${getRandom()}`,
            description: `project description ${getRandom()}`,
            color: 'blue' as Color,
          },
        },
        {
          cursor: '',
          node: {
            id: `project${getRandom()}`,
            name: `project name ${getRandom()}`,
            description: `project description ${getRandom()}`,
            color: 'green' as Color,
          },
        },
      ],
    };
  }
}

class MockGetBacklogByProjectIdService
  implements IGetBacklogByProjectIdService {
  handle() {
    return Promise.resolve({
      id: `mock backlog id ${getRandom()}`,
    });
  }
}

class MockListBoardsByProjectIdService
  implements IListBoardsByProjectIdService {
  async handle(): ReturnType<IListBoardsByProjectIdService['handle']> {
    return {
      edges: [
        {
          cursor: '',
          node: {
            id: `board${getRandom()}`,
            name: `board name ${getRandom()}`,
            description: `board description ${getRandom()}`,
            isArchived: false,
          },
        },
        {
          cursor: '',
          node: {
            id: `board${getRandom()}`,
            name: `board name ${getRandom()}`,
            description: `board description ${getRandom()}`,
            isArchived: false,
          },
        },
        {
          cursor: '',
          node: {
            id: `board${getRandom()}`,
            name: `board name ${getRandom()}`,
            description: `board description ${getRandom()}`,
            isArchived: false,
          },
        },
      ],
      hasNextPage: false,
    };
  }
}

class MockListUsersByProjectIdService implements IListUsersByProjectIdService {
  async handle(): ReturnType<IListUsersByProjectIdService['handle']> {
    return {
      edges: [
        {
          cursor: '',
          node: {
            id: `user${getRandom()}`,
            name: `user name ${getRandom()}`,
            icon: `user description ${getRandom()}`,
          },
        },
        {
          cursor: '',
          node: {
            id: `user${getRandom()}`,
            name: `user name ${getRandom()}`,
            icon: `user icon ${getRandom()}`,
          },
        },
        {
          cursor: '',
          node: {
            id: `user${getRandom()}`,
            name: `user name ${getRandom()}`,
            icon: `user icon ${getRandom()}`,
          },
        },
      ],
      hasNextPage: false,
    };
  }
}

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
  ],
})
export class ProjectModule {}
