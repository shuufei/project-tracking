import type { IListProjectsByUserIdService } from '@bison/backend/application';
import { LIST_PROJECTS_BY_USER_ID_SERVICE } from '@bison/backend/application';
import type { Project, User } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IdpUserId } from '../../decorators/idp-user-id.decorator';
import { ParseUserPipe } from '../../pipes/parse-user/parse-user.pipe';
import { convertToApiColorFromDomainColor } from '../../util/convert-to-color-from-domain-color';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(LIST_PROJECTS_BY_USER_ID_SERVICE)
    private listProjectsByUserIdService: IListProjectsByUserIdService
  ) {}

  @Query()
  async viewer(
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<Omit<User, 'projects'>> {
    return user;
  }

  @ResolveField()
  async projects(
    @Parent() user: Omit<User, 'projects'>
  ): Promise<Omit<Project, 'boards' | 'members' | 'admin'>[]> {
    const response = await this.listProjectsByUserIdService.handle(user.id);
    return response.projects.map((project) => {
      return {
        ...project,
        color: convertToApiColorFromDomainColor(project.color),
      };
    });
  }
}
