import type {
  IGetBoardByIdService,
  IGetProjectByBoardIdService,
  IGetUserByIdService,
  IListTasksByTaskGroupIdService,
} from '@bison/backend/application';
import {
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  GET_USER_BY_ID_SERVICE,
  LIST_TASKS_BY_TASK_GROUP_ID_SERVICE,
} from '@bison/backend/application';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToResolvedBoardFromDomainBoard } from '../../util/convert-to-resolved-board-from-domain-board';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import { convertToResolvedTaskFromDomainTask } from '../../util/convert-to-resolved-task-from-domain-task';
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
    private listTasksByTaskGroupIdService: IListTasksByTaskGroupIdService
  ) {}

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
    if (taskGroup.assign === undefined) {
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
}
