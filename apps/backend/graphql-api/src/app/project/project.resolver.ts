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
import type { Backlog, Board, Project, User } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

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

  @ResolveField()
  async backlog(@Parent() project: Project): Promise<Omit<Backlog, 'project'>> {
    return this.getBacklogByProjectIdService.handle(project.id);
  }

  @ResolveField()
  async boards(@Parent() project: Project): Promise<Omit<Board, 'project'>[]> {
    const response = await this.listBoardsByProjectIdService.handle(project.id);
    return response.boards;
  }

  @ResolveField()
  async members(@Parent() project: Project): Promise<Omit<User, 'projects'>[]> {
    const response = await this.listMembersService.handle(project.id);
    return response.users;
  }

  @ResolveField()
  async admin(@Parent() project: Project): Promise<Omit<User, 'projects'>> {
    return this.getAdminService.handle(project.id);
  }
}
