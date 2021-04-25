import type {
  IGetAdminService,
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListMembersService,
  IListProjectsService,
} from '@bison/backend/application';
import {
  GET_ADMIN_SERVICE,
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
  LIST_PROJECTS_SERVICE,
} from '@bison/backend/application';
import type { Project } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
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
  async projects(): Promise<
    Omit<Project, 'backlog' | 'boards' | 'members' | 'admin'>[]
  > {
    const response = await this.listProjectsService.handle();
    return response.projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      color: convertToApiColorFromDomainColor(project.color),
    }));
  }

  // @ResolveField()
  // async backlog(@Parent() project: Project): Promise<Omit<Backlog, 'project'>> {
  //   return this.getBacklogByProjectIdService.handle(project.id);
  // }

  // @ResolveField()
  // async boards(
  //   @Parent() project: Project,
  //   @Args('first') first: number,
  //   @Args('after') after?: Cursor
  // ): Promise<OmitConnectionNode<BoardConnection, 'project'>> {
  //   const response = await this.listBoardsByProjectIdService.handle(
  //     project.id,
  //     first,
  //     after
  //   );
  //   return {
  //     edges: response.edges,
  //     pageInfo: {
  //       endCursor: last<BoardEdge[][number]>(response.edges)?.cursor,
  //       hasNextPage: response.hasNextPage,
  //     },
  //   };
  // }

  // @ResolveField()
  // async members(
  //   @Parent() project: Project,
  //   @Args('first') first: number,
  //   @Args('after') after?: Cursor
  // ): Promise<OmitConnectionNode<UserConnection, 'projects'>> {
  //   const response = await this.listMembersService.handle(
  //     project.id,
  //     first,
  //     after
  //   );
  //   return {
  //     edges: response.edges,
  //     pageInfo: {
  //       endCursor: last<UserEdge[][number]>(response.edges)?.cursor,
  //       hasNextPage: response.hasNextPage,
  //     },
  //   };
  // }

  // @ResolveField()
  // async admin(@Parent() project: Project): Promise<Omit<User, 'projects'>> {
  //   return this.getAdminService.handle(project.id);
  // }
}
