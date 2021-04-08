import type {
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListProjectsService,
  IListUsersByProjectIdService,
} from '@bison/backend/application';
import {
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_PROJECTS_SERVICE,
  LIST_USERS_BY_PROJECT_ID_SERVICE,
} from '@bison/backend/application';
import { ProjectEdge } from '@bison/backend/domain';
import type { Color as DomainColor } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { last } from 'lodash/fp';
import { OmitConnectionNode } from '../../helper-types';
import type {
  Backlog,
  Board,
  Project,
  ProjectConnection,
} from '../../schema-types';
import { Color } from '../../schema-types';

// TODO: presentationレイヤに共通処理として定義する
export const convertToApiColorFromDomainColor = (color: DomainColor): Color => {
  switch (color) {
    case 'blue':
      return Color.BLUE;
    case 'green':
      return Color.GREEN;
    case 'red':
      return Color.RED;
    case 'yellow':
      return Color.YELLOW;
    case 'brown':
      return Color.BROWN;
    case 'pink':
      return Color.PINK;
    case 'gray':
      return Color.GRAY;
  }
};

@Resolver('Project')
export class ProjectResolver {
  constructor(
    @Inject(LIST_PROJECTS_SERVICE)
    private listProjectsService: IListProjectsService,
    @Inject(GET_BACKLOG_BY_PROJECT_ID_SERVICE)
    private getBacklogByProjectIdService: IGetBacklogByProjectIdService,
    @Inject(LIST_BOARDS_BY_PROJECT_ID_SERVICE)
    private listBoardsByProjectIdService: IListBoardsByProjectIdService,
    @Inject(LIST_USERS_BY_PROJECT_ID_SERVICE)
    private listUsersByProjectIdService: IListUsersByProjectIdService
  ) {}

  @Query()
  async projects(
    @Args('first', { type: () => Int }) first: number,
    @Args('after', { type: () => ID }) after?: Project['id']
  ): Promise<
    OmitConnectionNode<ProjectConnection, 'backlog' | 'boards' | 'users'>
  > {
    const response = await this.listProjectsService.handle(first, after);
    const edges: OmitConnectionNode<
      ProjectConnection,
      'backlog' | 'boards' | 'users'
    >['edges'] = response.edges.map((edge) => ({
      cursor: edge.cursor,
      node: {
        id: edge.node.id,
        name: edge.node.name,
        description: edge.node.description,
        color: convertToApiColorFromDomainColor(edge.node.color),
      },
    }));
    return {
      pageInfo: {
        endCursor: last<ProjectEdge[][number]>(response.edges)?.node.id,
        hasNextPage: response.hasNextPage,
      },
      edges,
    };
  }

  @ResolveField()
  async backlog(@Parent() project: Project): Promise<Omit<Backlog, 'project'>> {
    return this.getBacklogByProjectIdService.handle(project.id);
  }

  @ResolveField()
  async boards(
    @Parent() project: Project,
    @Args('first', { type: () => Int }) first: number,
    @Args('after', { type: () => ID }) after?: Board['id']
  ) {
    return this.listBoardsByProjectIdService.handle(project.id, first, after);
  }

  @ResolveField()
  async users(
    @Parent() project: Project,
    @Args('first', { type: () => Int }) first: number,
    @Args('after', { type: () => ID }) after?: Board['id']
  ) {
    return this.listUsersByProjectIdService.handle(project.id, first, after);
  }
}
