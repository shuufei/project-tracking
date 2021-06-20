import { BoardTaskType as DomainBoardTaskType } from '@bison/shared/domain';
import { BoardTaskType } from '@bison/shared/schema';

export const convertToDomainBoardTaskTypeFromApiBoardTaskType = (
  boardTaskType: BoardTaskType
): DomainBoardTaskType => {
  switch (boardTaskType) {
    case BoardTaskType.TASK:
      return 'Task';
    case BoardTaskType.TASKGROUP:
      return 'TaskGroup';
  }
};
