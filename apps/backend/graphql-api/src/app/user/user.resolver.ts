import type { IListProjectsByUserIdService } from '@bison/backend/application';
import { LIST_PROJECTS_BY_USER_ID_SERVICE } from '@bison/backend/application';
import { ProjectEdge } from '@bison/backend/domain';
import type { Project, ProjectConnection, User } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Args, ID, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { last } from 'lodash/fp';
import { OmitConnectionNode } from '../../helper-types';
import { convertToApiColorFromDomainColor } from '../util/convert-to-color-from-domain-color';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject(LIST_PROJECTS_BY_USER_ID_SERVICE)
    private listProjectsByUserIdService: IListProjectsByUserIdService
  ) {}

  @ResolveField()
  async projects(
    @Parent() user: User,
    @Args('first', { type: () => Int }) first: number,
    @Args('after', { type: () => ID }) after?: Project['id']
  ): Promise<
    OmitConnectionNode<ProjectConnection, 'backlog' | 'boards' | 'members'>
  > {
    const response = await this.listProjectsByUserIdService.handle(
      user.id,
      first,
      after
    );
    return {
      pageInfo: {
        endCursor: last<ProjectEdge>(response.edges)?.node.id,
        hasNextPage: response.hasNextPage,
      },
      edges: response.edges.map((edge) => ({
        ...edge,
        node: {
          ...edge.node,
          color: convertToApiColorFromDomainColor(edge.node.color),
        },
      })),
    };
  }
}
