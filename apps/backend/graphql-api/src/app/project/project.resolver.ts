import type {
  BoardEdge,
  IGetAdminService,
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListMembersService,
  IListProjectsService,
  UserEdge,
} from '@bison/backend/application';
import {
  GET_ADMIN_SERVICE,
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
  LIST_PROJECTS_SERVICE,
} from '@bison/backend/application';
import type { Cursor, ProjectEdge } from '@bison/backend/domain';
import type {
  Backlog,
  BoardConnection,
  Project,
  ProjectConnection,
  User,
  UserConnection,
} from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { last } from 'lodash/fp';
import { OmitConnectionNode } from '../../helper-types';
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
    @Inject(LIST_MEMBERS_SERVICE)
    private listMembersService: IListMembersService,
    @Inject(GET_ADMIN_SERVICE)
    private getAdminService: IGetAdminService
  ) {}

  @Query()
  async projects(
    @Args('first') first: number,
    @Args('after') after?: Cursor
  ): Promise<
    OmitConnectionNode<
      ProjectConnection,
      'backlog' | 'boards' | 'members' | 'admin'
    >
  > {
    const response = await this.listProjectsService.handle(first, after);
    const edges: OmitConnectionNode<
      ProjectConnection,
      'backlog' | 'boards' | 'members' | 'admin'
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
    @Args('after') after?: Cursor
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
  async members(
    @Parent() project: Project,
    @Args('first') first: number,
    @Args('after') after?: Cursor
  ): Promise<OmitConnectionNode<UserConnection, 'projects'>> {
    const response = await this.listMembersService.handle(
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

  @ResolveField()
  async admin(@Parent() project: Project): Promise<Omit<User, 'projects'>> {
    return this.getAdminService.handle(project.id);
  }
}
