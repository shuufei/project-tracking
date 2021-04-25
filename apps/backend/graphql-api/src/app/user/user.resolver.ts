import type { IListProjectsByUserIdService } from '@bison/backend/application';
import { LIST_PROJECTS_BY_USER_ID_SERVICE } from '@bison/backend/application';
import type { Project, User } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToApiColorFromDomainColor } from '../util/convert-to-color-from-domain-color';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(LIST_PROJECTS_BY_USER_ID_SERVICE)
    private listProjectsByUserIdService: IListProjectsByUserIdService
  ) {}

  @ResolveField()
  async projects(
    @Parent() user: User
  ): Promise<Omit<Project, 'backlog' | 'boards' | 'members' | 'admin'>[]> {
    const response = await this.listProjectsByUserIdService.handle(user.id);
    return response.projects.map((project) => {
      return {
        ...project,
        color: convertToApiColorFromDomainColor(project.color),
      };
    });
  }
}
