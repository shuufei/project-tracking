import type { IGetProjectByBacklogIdService } from '@bison/backend/application';
import { GET_PROJECT_BY_BACKLOG_ID_SERVICE } from '@bison/backend/application';
import type { Backlog, Project } from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToApiColorFromDomainColor } from '../util/convert-to-color-from-domain-color';

@Resolver('Backlog')
export class BacklogReolver {
  constructor(
    @Inject(GET_PROJECT_BY_BACKLOG_ID_SERVICE)
    private getProjectByBacklogIdService: IGetProjectByBacklogIdService
  ) {}

  @ResolveField()
  async project(
    @Parent() backlog: Backlog
  ): Promise<Omit<Project, 'backlog' | 'boards' | 'members' | 'admin'>> {
    const project = await this.getProjectByBacklogIdService.handle(backlog.id);
    return {
      ...project,
      color: convertToApiColorFromDomainColor(project.color),
    };
  }
}
