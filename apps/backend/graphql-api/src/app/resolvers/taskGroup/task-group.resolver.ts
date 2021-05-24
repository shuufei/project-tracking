import type {
  IGetBoardByIdService,
  IGetProjectByBoardIdService,
} from '@bison/backend/application';
import {
  GET_BOARD_BY_ID_SERVICE,
  GET_PROJECT_BY_BOARD_ID_SERVICE,
} from '@bison/backend/application';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToApiBoardTaskTypeFromDomainBoardTaskType } from '../../util/convert-to-board-task-type-from-domain-board-task-type';
import { convertToResolvedProjectFromDomainProject } from '../../util/convert-to-resolved-project-from-domain-project';
import type {
  ResolvedBoard,
  ResolvedProject,
  ResolvedTaskGroup,
} from '../resolved-value-type';

@Resolver('TaskGroup')
export class TaskGroupResolver {
  constructor(
    @Inject(GET_BOARD_BY_ID_SERVICE)
    private getBoardByIdService: IGetBoardByIdService,
    @Inject(GET_PROJECT_BY_BOARD_ID_SERVICE)
    private getProjectByBoardIdService: IGetProjectByBoardIdService
  ) {}

  @ResolveField()
  async board(@Parent() taskGroup: ResolvedTaskGroup): Promise<ResolvedBoard> {
    const board = await this.getBoardByIdService.handle(taskGroup.board.id);
    return {
      ...board,
      project: {
        id: board.projectId,
      },
      tasksOrder: board.tasksOrder.map((v) => ({
        taskId: v.taskId,
        type: convertToApiBoardTaskTypeFromDomainBoardTaskType(v.type),
      })),
    };
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
}
