import type {
  IGetBoardByIdAndUserService,
  IGetProjectByBoardIdService,
  IListTaskGroupsByBoardIdService,
} from '@bison/backend/application';
import {
  GET_BOARD_BY_ID_AND_USER_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE,
} from '@bison/backend/application';
import type { Id, User } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IdpUserId } from '../../decorators/idp-user-id.decorator';
import { ParseUserPipe } from '../../pipes/parse-user/parse-user.pipe';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import { convertToResolvedTaskGroupFromDomainTaskGroup } from '../../util/convert-to-resolved-task-group-from-domain-task-group';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedTaskGroup,
} from '../resolved-value-type';

@Resolver('Board')
export class BoardResolver {
  constructor(
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService,
    @Inject(GET_BOARD_BY_ID_AND_USER_SERVICE)
    private getBoardByIdService: IGetBoardByIdAndUserService,
    @Inject(LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE)
    private listTaskGroupsByBoardIdService: IListTaskGroupsByBoardIdService
  ) {}

  @Query()
  async board(
    @IdpUserId(ParseUserPipe) user: User,
    @Args('id', { type: () => ID }) id: Id
  ): Promise<ResolvedBoard> {
    const board = await this.getBoardByIdService.handle(id, user);
    return convertToResolvedBoardFromDomainBoard(board);
  }

  @ResolveField()
  async project(@Parent() board: ResolvedBoard): Promise<ResolvedProject> {
    const project = await this.getProjectByBoardIdService.handle(board.id);
    return convertToResolvedProjectFromDomainProject(project);
  }

  @ResolveField()
  async taskGroups(
    @Parent() board: ResolvedBoard
  ): Promise<ResolvedTaskGroup[]> {
    const { taskGroups } = await this.listTaskGroupsByBoardIdService.handle(
      board.id
    );
    return taskGroups.map(convertToResolvedTaskGroupFromDomainTaskGroup);
  }
}
