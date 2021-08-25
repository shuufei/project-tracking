import { BoardTaskType as DomainBoardTaskType } from '@bison/shared/domain';
import { BoardTaskType } from '@bison/shared/schema';

export const convertToDomainTaskTypeFromApiTaskType = (
  type: BoardTaskType
): DomainBoardTaskType => {
  switch (type) {
    case BoardTaskType.TASKGROUP:
      return 'TaskGroup';
    case BoardTaskType.TASK:
      return 'Task';
  }
};
