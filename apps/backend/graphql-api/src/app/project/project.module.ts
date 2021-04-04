import {
  IProjectRepository,
  ListResponse,
  ProjectEntity,
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
      projects: [],
      nextEntityId: '',
    };
  }
}

class MockProjectRepository implements IProjectRepository {
  async getById() {
    const color: Color = 'blue';
    return {
      entity: {
        id: 'project001',
        name: 'project name 001',
        description: 'project description 001',
        color,
      },
    };
  }

  async list(
    first: number,
    after?: ProjectEntity['id']
  ): Promise<ListResponse> {
    return {
      entities: [
        {
          id: 'project001',
          name: 'project name 001',
          description: 'project description 001',
          color: 'red' as Color,
        },
        {
          id: 'project002',
          name: 'project name 002',
          description: 'project description 002',
          color: 'blue' as Color,
        },
        {
          id: 'project003',
          name: 'project name 003',
          description: 'project description 003',
          color: 'green' as Color,
        },
      ],
      nextEntityId: 'project999',
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
