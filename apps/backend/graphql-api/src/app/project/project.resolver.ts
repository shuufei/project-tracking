import type {
  BoardEdge,
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListProjectsService,
  IListUsersByProjectIdService,
  UserEdge,
} from '@bison/backend/application';
import {
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_PROJECTS_SERVICE,
  LIST_USERS_BY_PROJECT_ID_SERVICE,
} from '@bison/backend/application';
import { ProjectEdge } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { last } from 'lodash/fp';
import { OmitConnectionNode } from '../../helper-types';
import type {
  Backlog,
  Board,
  BoardConnection,
  Project,
  ProjectConnection,
  UserConnection,
} from '../../schema-types';
import { convertToApiColorFromDomainColor } from '../util/convert-to-color-from-domain-color';

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
    @Args('first') first: number,
    @Args('after') after?: Project['id']
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
        endCursor: last<ProjectEdge>(response.edges)?.cursor,
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
    @Args('first') first: number,
    @Args('after') after?: Board['id']
  ): Promise<OmitConnectionNode<BoardConnection, 'project'>> {
    const response = await this.listBoardsByProjectIdService.handle(
      project.id,
      first,
      after
    );
    return {
      edges: response.edges,
      pageInfo: {
        endCursor: last<BoardEdge[][number]>(response.edges)?.cursor,
        hasNextPage: response.hasNextPage,
      },
    };
  }

  @ResolveField()
  async users(
    @Parent() project: Project,
    @Args('first') first: number,
    @Args('after') after?: Board['id']
  ): Promise<OmitConnectionNode<UserConnection, 'projects'>> {
    const response = await this.listUsersByProjectIdService.handle(
      project.id,
      first,
      after
    );
    return {
      edges: response.edges,
      pageInfo: {
        endCursor: last<UserEdge[][number]>(response.edges)?.cursor,
        hasNextPage: response.hasNextPage,
      },
    };
  }
}
