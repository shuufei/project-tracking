import { Board } from '@bison/shared/domain';
import { ResolvedBoard } from '../resolvers/resolved-value-type';
import { convertToApiBoardTaskTypeFromDomainBoardTaskType } from './convert-to-board-task-type-from-domain-board-task-type';

export const convertToResolvedBoardFromDomainBoard = (
  board: Board
): ResolvedBoard => {
  return {
    id: board.id,
    name: board.name,
    description: board.description,
    tasksOrder: board.tasksOrder.map((v) => ({
      taskId: v.taskId,
      type: convertToApiBoardTaskTypeFromDomainBoardTaskType(v.type),
    })),
    project: {
      id: board.projectId,
    },
    createdAt: board.createdAt,
  };
};
