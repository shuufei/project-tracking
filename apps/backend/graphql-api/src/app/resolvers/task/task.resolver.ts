import type {
  IGetBoardByIdService,
  IGetProjectByBoardIdService,
  IGetUserByIdService,
} from '@bison/backend/application';
import {
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
} from '@bison/backend/application';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedTask,
  ResolvedUser,
} from '../resolved-value-type';

@Resolver('Task')
export class TaskResolver {
  constructor(
    @Inject(GET_BOARD_BY_ID_SERVICE)
    private getBoardByIdService: IGetBoardByIdService,
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService,
    @Inject(GET_USER_BY_ID_SERVICE)
    private getUserByIdService: IGetUserByIdService
  ) {}

  @ResolveField()
  async board(@Parent() task: ResolvedTask): Promise<ResolvedBoard> {
    const board = await this.getBoardByIdService.handle(task.board.id);
    return convertToResolvedBoardFromDomainBoard(board);
  }

  @ResolveField()
  async project(@Parent() task: ResolvedTask): Promise<ResolvedProject> {
    const project = await this.getProjectByBoardIdService.handle(task.board.id);
    return convertToResolvedProjectFromDomainProject(project);
  }

  @ResolveField()
  async assign(
    @Parent() task: ResolvedTask
  ): Promise<ResolvedUser | undefined> {
    return (
      task.assign && (await this.getUserByIdService.handle(task.assign.id))
    );
  }
}
