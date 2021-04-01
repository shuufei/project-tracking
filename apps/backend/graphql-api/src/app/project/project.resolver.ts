import type { IListProjectsUsecase } from '@bison/backend/usecase';
import { LIST_PROJECTS_USECASE } from '@bison/backend/usecase';
import { Inject } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import type {
  Connection,
  PageInfo,
  Project,
  ProjectConnection,
} from '../../types';
import { Color } from '../../types';

@Resolver('Project')
export class ProjectResolver {
  constructor(
    @Inject(LIST_PROJECTS_USECASE)
    private listProjectsUsecase: IListProjectsUsecase
  ) {}

  @Query()
  async projects(): Promise<
    OmitForConnectionNode<ProjectConnection, 'backlog' | 'boards' | 'users'>
  > {
    const projects = await this.listProjectsUsecase.execute();
    return {
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: true,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: '',
          node: {
            id: 'sample_project_001',
            name: 'sample project 001',
            color: Color.BLUE,
          },
        },
      ],
    };
  }

  @ResolveField()
  async backlog(@Parent() project: Project) {
    return {
      id: 'sample_backlog_001',
    };
  }
}

type OmitForConnectionNode<
  T extends Connection,
  K extends keyof T['edges'][number]['node']
> = {
  pageInfo: PageInfo;
  edges: {
    cursor: string;
    node: {
      [key in keyof Omit<
        T['edges'][number]['node'],
        K
      >]: T['edges'][number]['node'][key];
    };
  }[];
};
