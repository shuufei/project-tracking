import type {
  ICreateProjectService,
  IDeleteProjectService,
  IGetAdminService,
  IGetProjectByIdAndUserService,
  IListBoardsByProjectIdService,
  IListMembersService,
  IUpdatePrjojectService,
} from '@bison/backend/application';
import {
  CREATE_PROJECT_SERVICE,
  DELETE_PROJECT_SERVICE,
  GET_ADMIN_SERVICE,
  GET_PROJECT_BY_ID_AND_USER_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
  UPDATE_PROJECT_SERVICE,
} from '@bison/backend/application';
import type { Id, User } from '@bison/shared/domain';
import type {
  CreateProjectInput,
  DeleteProjectInput,
  UpdateProjectInput,
} from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IdpUserId } from '../../decorators/idp-user-id.decorator';
import { ParseUserPipe } from '../../pipes/parse-user/parse-user.pipe';
import { convertToDomainColorFromColor } from '../../util/convert-to-domain-color-from-color';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
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
    private getAdminService: IGetAdminService,
    @Inject(GET_PROJECT_BY_ID_AND_USER_SERVICE)
    private getProjectByIdAndUserService: IGetProjectByIdAndUserService,
    @Inject(CREATE_PROJECT_SERVICE)
    private createProjectService: ICreateProjectService,
    @Inject(UPDATE_PROJECT_SERVICE)
    private updateProjectService: IUpdatePrjojectService,
    @Inject(DELETE_PROJECT_SERVICE)
    private deleteProjectService: IDeleteProjectService
  ) {}

  @Query()
  async project(
    @IdpUserId(ParseUserPipe) user: User,
    @Args('id', { type: () => ID }) id: Id
  ): Promise<ResolvedProject> {
    const project = await this.getProjectByIdAndUserService.handle(id, user);
    return convertToResolvedProjectFromDomainProject(project);
  }

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

  @Mutation()
  async createProject(
    @Args('input') input: CreateProjectInput
  ): Promise<ResolvedProject> {
    const project = await this.createProjectService.handle({
      name: input.name,
      description: input.description,
      color: convertToDomainColorFromColor(input.color),
      adminUserId: input.adminUserId,
    });
    return convertToResolvedProjectFromDomainProject(project);
  }

  @Mutation()
  async updateProject(
    @Args('input') input: UpdateProjectInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedProject> {
    const project = await this.updateProjectService.handle(
      {
        id: input.id,
        name: input.name,
        description: input.description,
        color: convertToDomainColorFromColor(input.color),
        adminUserId: input.adminUserId,
      },
      user
    );
    return convertToResolvedProjectFromDomainProject(project);
  }

  @Mutation()
  async deleteProject(
    @Args('input') input: DeleteProjectInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedProject> {
    const project = await this.deleteProjectService.handle(input.id, user);
    return convertToResolvedProjectFromDomainProject(project);
  }
}
