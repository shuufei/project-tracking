import type { IGetProjectByBoardIdService } from '@bison/backend/application';
import { GET_PROJECT_BY_BOARD_ID_SERVICE } from '@bison/backend/application';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import type { Board, Project } from '../../schema-types';
import { convertToApiColorFromDomainColor } from '../util/convert-to-color-from-domain-color';

@Resolver('Board')
export class BoardResolver {
  constructor(
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService
  ) {}

  @ResolveField()
  async project(
    @Parent() board: Board
  ): Promise<Omit<Project, 'backlog' | 'boards' | 'users'>> {
    const project = await this.getProjectByBoardIdService.handle(board.id);
    return {
      ...project,
      color: convertToApiColorFromDomainColor(project.color),
    };
  }
}
