import type {
  ICreateTaskGroupService,
  IDeleteTaskGroupService,
  IGetBoardByIdService,
  IGetProjectByBoardIdService,
  IGetTaskGroupByIdService,
  IGetUserByIdService,
  IListTasksByTaskGroupIdService,
  IUpdateTaskGroupService,
} from '@bison/backend/application';
import {
  CREATE_TASK_GROUP_SERVICE,
  DELETE_TASK_GROUP_SERVICE,
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_TASK_GROUP_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  LIST_TASKS_BY_TASK_GROUP_ID_SERVICE,
  UPDATE_TASK_GROUP_SERVICE,
} from '@bison/backend/application';
import type { Id, User } from '@bison/shared/domain';
import type {
  CreateTaskGroupInput,
  DeleteTaskGroupInput,
  UpdateTaskGroupInput,
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
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import { convertToResolvedTaskFromDomainTask } from '../../util/convert-to-resolved-task-from-domain-task';
import { convertToResolvedTaskGroupFromDomainTaskGroup } from '../../util/convert-to-resolved-task-group-from-domain-task-group';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedTask,
  ResolvedTaskGroup,
  ResolvedUser,
} from '../resolved-value-type';

@Resolver('TaskGroup')
export class TaskGroupResolver {
  constructor(
    @Inject(GET_BOARD_BY_ID_SERVICE)
    private getBoardByIdService: IGetBoardByIdService,
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService,
    @Inject(GET_USER_BY_ID_SERVICE)
    private getUserByIdService: IGetUserByIdService,
    @Inject(LIST_TASKS_BY_TASK_GROUP_ID_SERVICE)
    private listTasksByTaskGroupIdService: IListTasksByTaskGroupIdService,
    @Inject(CREATE_TASK_GROUP_SERVICE)
    private createTaskGroupService: ICreateTaskGroupService,
    @Inject(UPDATE_TASK_GROUP_SERVICE)
    private updateTaskGroupService: IUpdateTaskGroupService,
    @Inject(DELETE_TASK_GROUP_SERVICE)
    private deleteTaskGroupService: IDeleteTaskGroupService,
    @Inject(GET_TASK_GROUP_BY_ID_SERVICE)
    private getTaskGroupByIdService: IGetTaskGroupByIdService
  ) {}

  @Query()
  async taskGroup(
    @IdpUserId(ParseUserPipe) user: User,
    @Args('id', { type: () => ID }) id: Id
  ): Promise<ResolvedTaskGroup> {
    const taskGroup = await this.getTaskGroupByIdService.handle(id);
    return convertToResolvedTaskGroupFromDomainTaskGroup(taskGroup);
  }

  @ResolveField()
  async board(@Parent() taskGroup: ResolvedTaskGroup): Promise<ResolvedBoard> {
    const board = await this.getBoardByIdService.handle(taskGroup.board.id);
    return convertToResolvedBoardFromDomainBoard(board);
  }

  @ResolveField()
  async project(
    @Parent() taskGroup: ResolvedTaskGroup
  ): Promise<ResolvedProject> {
    const project = await this.getProjectByBoardIdService.handle(
      taskGroup.board.id
    );
    return convertToResolvedProjectFromDomainProject(project);
  }

  @ResolveField()
  async assign(
    @Parent() taskGroup: ResolvedTaskGroup
  ): Promise<ResolvedUser | undefined> {
    if (taskGroup.assign == null) {
      return undefined;
    }
    const user = await this.getUserByIdService.handle(taskGroup.assign.id);
    return user;
  }

  @ResolveField()
  async tasks(@Parent() taskGroup: ResolvedTaskGroup): Promise<ResolvedTask[]> {
    const response = await this.listTasksByTaskGroupIdService.handle(
      taskGroup.id
    );
    return response.tasks.map(convertToResolvedTaskFromDomainTask);
  }

  @Mutation()
  async createTaskGroup(
    @Args('input') input: CreateTaskGroupInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTaskGroup> {
    const taskGroup = await this.createTaskGroupService.handle(
      {
        title: input.title,
        description: input.description,
        assignUserId: input.assignUserId,
        boardId: input.boardId,
        scheduledTimeSec: input.scheduledTimeSec,
      },
      user
    );
    return convertToResolvedTaskGroupFromDomainTaskGroup(taskGroup);
  }

  @Mutation()
  async updateTaskGroup(
    @Args('input') input: UpdateTaskGroupInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTaskGroup> {
    const taskGroup = await this.updateTaskGroupService.handle(input, user);
    return convertToResolvedTaskGroupFromDomainTaskGroup(taskGroup);
  }

  @Mutation()
  async deleteTaskGroup(
    @Args('input') input: DeleteTaskGroupInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTaskGroup> {
    const taskGroup = await this.deleteTaskGroupService.handle(input.id, user);
    return convertToResolvedTaskGroupFromDomainTaskGroup(taskGroup);
  }
}
