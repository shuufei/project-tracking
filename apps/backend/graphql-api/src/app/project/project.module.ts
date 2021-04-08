import {
  IProjectRepository,
  ListResponse,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import type { IListProjectsUsecase } from '@bison/backend/usecase';
import {
  ListProjectsUsecase,
  LIST_PROJECTS_USECASE,
} from '@bison/backend/usecase';
import type { Color } from '@bison/shared/domain';
import { Module } from '@nestjs/common';
import { ProjectResolver } from './project.resolver';

class MockListProjectsUsecase implements IListProjectsUsecase {
  async execute() {
    return {
      edges: [],
      hasNextPage: true,
    };
  }
}

class MockProjectRepository implements IProjectRepository {
  async list(): Promise<ListResponse> {
    return {
      edges: [
        {
          cursor: '',
          node: {
            id: 'project001',
            name: 'project name 001',
            description: 'project description 001',
            color: 'red' as Color,
          },
        },
        {
          cursor: '',
          node: {
            id: 'project002',
            name: 'project name 002',
            description: 'project description 002',
            color: 'blue' as Color,
          },
        },
        {
          cursor: '',
          node: {
            id: 'project003',
            name: 'project name 003',
            description: 'project description 003',
            color: 'green' as Color,
          },
        },
      ],
    };
  }
}

@Module({
  providers: [
    ProjectResolver,
    {
      provide: LIST_PROJECTS_USECASE,
      useClass: ListProjectsUsecase,
    },
    {
      provide: PROJECT_REPOSITORY,
      useValue: new MockProjectRepository(),
    },
  ],
})
export class ProjectModule {}
