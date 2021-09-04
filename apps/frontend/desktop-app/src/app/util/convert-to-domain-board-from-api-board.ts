import { Board } from '@bison/frontend/domain';
import { Board as ApiBoard } from '@bison/shared/schema';
import { convertToDomainTaskFromApiTask } from './convert-to-domain-task-from-api-task';
import { convertToDomainTaskGroupFromApiTaskGroup } from './convert-to-domain-task-group-from-api-task-group';
import { convertToDomainTaskTypeFromApiTaskType } from './convert-to-domain-task-type-from-api-task-type';

export const convertToDomainBoardFromApiBoard = (board: ApiBoard): Board => {
  return {
    id: board.id,
    name: board.name,
    description: board.description,
    projectId: board.project.id,
    soloTasks: board.soloTasks.map(convertToDomainTaskFromApiTask),
    taskGroups: board.taskGroups.map(convertToDomainTaskGroupFromApiTaskGroup),
    tasksOrder: board.tasksOrder.map((v) => ({
      taskId: v.taskId,
      type: convertToDomainTaskTypeFromApiTaskType(v.type),
    })),
    createdAt: board.createdAt,
  };
};
