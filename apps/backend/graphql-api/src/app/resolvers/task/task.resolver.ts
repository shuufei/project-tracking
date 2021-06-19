import type {
  ICreateTaskOnBoardService,
  ICreateTaskOnTaskGroupService,
  IDeleteTaskService,
  IGetBoardByIdService,
  IGetProjectByBoardIdService,
  IGetTaskGroupByIdService,
  IGetUserByIdService,
  IListSubtasksByTaskIdService,
  IUpdateTaskService,
} from '@bison/backend/application';
import {
  CREATE_TASK_ON_BOARD_SERVICE,
  CREATE_TASK_ON_TASK_GROUP_SERVICE,
  DELETE_TASK_SERVICE,
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_TASK_GROUP_BY_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  LIST_SUBTASKS_BY_TASK_ID_SERVICE,
  UPDATE_TASK_SERVICE,
} from '@bison/backend/application';
import type { User } from '@bison/shared/domain';
import type {
  CreateTaskOnBoardInput,
  CreateTaskOnTaskGroupInput,
  DeleteTaskInput,
  UpdateTaskInput,
} from '@bison/shared/schema';
import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IdpUserId } from '../../decorators/idp-user-id.decorator';
import { ParseUserPipe } from '../../pipes/parse-user/parse-user.pipe';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import { convertToResolvedSubtaskFromDomainSubtask } from '../../util/convert-to-resolved-subtask-from-domain-subtask';
import { convertToResolvedTaskFromDomainTask } from '../../util/convert-to-resolved-task-from-domain-task';
import { convertToResolvedTaskGroupFromDomainTaskGroup } from '../../util/convert-to-resolved-task-group-from-domain-task-group';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedSubtask,
  ResolvedTask,
  ResolvedTaskGroup,
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
    private getUserByIdService: IGetUserByIdService,
    @Inject(GET_TASK_GROUP_BY_ID_SERVICE)
    private getTaskGroupByIdService: IGetTaskGroupByIdService,
    @Inject(LIST_SUBTASKS_BY_TASK_ID_SERVICE)
    private listSubtasksByTaskIdService: IListSubtasksByTaskIdService,
    @Inject(CREATE_TASK_ON_BOARD_SERVICE)
    private readonly createTaskOnBoardService: ICreateTaskOnBoardService,
    @Inject(CREATE_TASK_ON_TASK_GROUP_SERVICE)
    private readonly createTaskOnTaskGroupService: ICreateTaskOnTaskGroupService,
    @Inject(DELETE_TASK_SERVICE)
    private readonly deleteTaskService: IDeleteTaskService,
    @Inject(UPDATE_TASK_SERVICE)
    private readonly udpateTaskService: IUpdateTaskService
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

  @ResolveField()
  async taskGroup(
    @Parent() task: ResolvedTask
  ): Promise<ResolvedTaskGroup | undefined> {
    const taskGroup =
      task.taskGroup &&
      (await this.getTaskGroupByIdService.handle(task.taskGroup?.id));
    return (
      taskGroup && convertToResolvedTaskGroupFromDomainTaskGroup(taskGroup)
    );
  }

  @ResolveField()
  async subtasks(@Parent() task: ResolvedTask): Promise<ResolvedSubtask[]> {
    const { subtasks } = await this.listSubtasksByTaskIdService.handle(task.id);
    return subtasks.map(convertToResolvedSubtaskFromDomainSubtask);
  }

  @Mutation()
  async createTaskOnBoard(
    @Args('input') input: CreateTaskOnBoardInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTask> {
    const task = await this.createTaskOnBoardService.handle(input, user);
    return convertToResolvedTaskFromDomainTask(task);
  }

  @Mutation()
  async createTaskOnTaskGroup(
    @Args('input') input: CreateTaskOnTaskGroupInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTask> {
    const task = await this.createTaskOnTaskGroupService.handle(input, user);
    return convertToResolvedTaskFromDomainTask(task);
  }

  @Mutation()
  async updateTask(
    @Args('input') input: UpdateTaskInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTask> {
    const task = await this.udpateTaskService.handle(
      {
        ...input,
        workTimeSec: input.workTime ?? 0,
      },
      user
    );
    return convertToResolvedTaskFromDomainTask(task);
  }

  @Mutation()
  async deleteTask(
    @Args('input') input: DeleteTaskInput,
    @IdpUserId(ParseUserPipe) user: User
  ): Promise<ResolvedTask> {
    const task = await this.deleteTaskService.handle(input.id, user);
    return convertToResolvedTaskFromDomainTask(task);
  }
}
