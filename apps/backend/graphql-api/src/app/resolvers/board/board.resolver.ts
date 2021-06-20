import type {
  ICreateBoardService,
  IDeleteBoardService,
  IGetBoardByIdAndUserService,
  IGetProjectByBoardIdService,
  IListSoloTasksByBoardIdService,
  IListTaskGroupsByBoardIdService,
  IUpdateBoardService,
} from '@bison/backend/application';
import {
  CREATE_BOARD_SERVICE,
  DELETE_BOARD_SERVICE,
  GET_BOARD_BY_ID_AND_USER_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  LIST_SOLO_TASKS_BY_BOARD_ID_SERVICE,
  LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE,
  UPDATE_BOARD_SERVICE,
} from '@bison/backend/application';
import type { Id, User } from '@bison/shared/domain';
import type {
  CreateBoardInput,
  DeleteBoardInput,
  UpdateBoardInput,
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
import { convertToDomainBoardTaskTypeFromApiBoardTaskType } from '../../util/convert-to-domain-board-task-type-from-api-board-task-type';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import { convertToResolvedTaskFromDomainTask } from '../../util/convert-to-resolved-task-from-domain-task';
import { convertToResolvedTaskGroupFromDomainTaskGroup } from '../../util/convert-to-resolved-task-group-from-domain-task-group';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedTask,
  ResolvedTaskGroup,
} from '../resolved-value-type';

@Resolver('Board')
export class BoardResolver {
  constructor(
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService,
    @Inject(GET_BOARD_BY_ID_AND_USER_SERVICE)
    private getBoardByIdAndUserService: IGetBoardByIdAndUserService,
    @Inject(LIST_TASK_GROUPS_BY_BOARD_ID_SERVICE)
    private listTaskGroupsByBoardIdService: IListTaskGroupsByBoardIdService,
    @Inject(LIST_SOLO_TASKS_BY_BOARD_ID_SERVICE)
    private listSoloTasksByBoardIdService: IListSoloTasksByBoardIdService,
    @Inject(CREATE_BOARD_SERVICE)
    private createBoardService: ICreateBoardService,
    @Inject(UPDATE_BOARD_SERVICE)
    private updateBoardService: IUpdateBoardService,
    @Inject(DELETE_BOARD_SERVICE)
    private deleteBoardService: IDeleteBoardService
  ) {}

  @Query()
  async board(
    @IdpUserId(ParseUserPipe) user: User,
    @Args('id', { type: () => ID }) id: Id
  ): Promise<ResolvedBoard> {
    const board = await this.getBoardByIdAndUserService.handle(id, user);
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

  @ResolveField()
  async soloTasks(@Parent() board: ResolvedBoard): Promise<ResolvedTask[]> {
    const response = await this.listSoloTasksByBoardIdService.handle(board.id);
    return response.tasks.map(convertToResolvedTaskFromDomainTask);
  }

  @Mutation()
  async createBoard(
    @Args('input') input: CreateBoardInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedBoard> {
    const board = await this.createBoardService.handle(input, user);
    return convertToResolvedBoardFromDomainBoard(board);
  }

  @Mutation()
  async updateBoard(
    @Args('input') input: UpdateBoardInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedBoard> {
    const board = await this.updateBoardService.handle(
      {
        ...input,
        tasksOrder: input.tasksOrder.map((v) => ({
          taskId: v.taskId,
          type: convertToDomainBoardTaskTypeFromApiBoardTaskType(v.type),
        })),
      },
      user
    );
    return convertToResolvedBoardFromDomainBoard(board);
  }

  @Mutation()
  async deleteBoard(
    @Args('input') input: DeleteBoardInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedBoard> {
    const board = await this.deleteBoardService.handle(input.id, user);
    return convertToResolvedBoardFromDomainBoard(board);
  }
}
