import type { IGetBoardByIdService } from '@bison/backend/application';
import { GET_BOARD_BY_ID_SERVICE } from '@bison/backend/application';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { convertToApiBoardTaskTypeFromDomainBoardTaskType } from '../../util/convert-to-board-task-type-from-domain-board-task-type';
import type { ResolvedBoard, ResolvedTaskGroup } from '../resolved-value-type';

@Resolver('TaskGroup')
export class TaskGroupResolver {
  constructor(
    @Inject(GET_BOARD_BY_ID_SERVICE)
    private getBoardByIdService: IGetBoardByIdService
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
}
