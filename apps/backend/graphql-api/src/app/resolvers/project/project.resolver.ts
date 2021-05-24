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
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedUser,
} from '../resolved-value-type';

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
  async boards(@Parent() project: ResolvedProject): Promise<ResolvedBoard[]> {
    const response = await this.listBoardsByProjectIdService.handle(project.id);
    return response.boards.map(convertToResolvedBoardFromDomainBoard);
  }

  @ResolveField()
  async members(@Parent() project: ResolvedProject): Promise<ResolvedUser[]> {
    const response = await this.listMembersService.handle(project.id);
    return response.users;
  }

  @ResolveField()
  async admin(@Parent() project: ResolvedProject): Promise<ResolvedUser> {
    return this.getAdminService.handle(project.id);
  }
}
