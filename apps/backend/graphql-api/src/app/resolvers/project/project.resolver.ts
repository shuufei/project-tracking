import type {
  IGetAdminService,
  IListBoardsByProjectIdService,
  IListMembersService,
} from '@bison/backend/application';
import {
  GET_ADMIN_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
} from '@bison/backend/application';
import type { Board, Project, User } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('Project')
export class ProjectResolver {
  constructor(
    @Inject(LIST_BOARDS_BY_PROJECT_ID_SERVICE)
    private listBoardsByProjectIdService: IListBoardsByProjectIdService,
    @Inject(LIST_MEMBERS_SERVICE)
    private listMembersService: IListMembersService,
    @Inject(GET_ADMIN_SERVICE)
    private getAdminService: IGetAdminService
  ) {}

  @ResolveField()
  async boards(
    @Parent() project: Omit<Project, 'boards'>
  ): Promise<
    Omit<Board, 'project' | 'singleTasks' | 'taskGroups' | 'tasksOrder'>[]
  > {
    const response = await this.listBoardsByProjectIdService.handle(project.id);
    return response.boards;
  }

  @ResolveField()
  async members(
    @Parent() project: Omit<Project, 'members'>
  ): Promise<Omit<User, 'projects'>[]> {
    const response = await this.listMembersService.handle(project.id);
    return response.users;
  }

  @ResolveField()
  async admin(
    @Parent() project: Omit<Project, 'admin'>
  ): Promise<Omit<User, 'projects'>> {
    return this.getAdminService.handle(project.id);
  }
}
