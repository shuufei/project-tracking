import { TaskGroup } from '@bison/frontend/domain';
import { TaskGroup as ApiTaskGroup } from '@bison/shared/schema';
import { convertToDomainStatusFromApiStatus } from './convert-to-domain-status-from-api-status';
import { convertToDomainTaskFromApiTask } from './convert-to-domain-task-from-api-task';

export const convertToDomainTaskGroupFromApiTaskGroup = (
  taskGroup: ApiTaskGroup
): TaskGroup => {
  return {
    id: taskGroup.id,
    title: taskGroup.title,
    description: taskGroup.description,
    status: convertToDomainStatusFromApiStatus(taskGroup.status),
    scheduledTimeSec: taskGroup.scheduledTimeSec,
    tasksOrder: taskGroup.tasksOrder,
    assignUser: taskGroup.assign,
    board: {
      id: taskGroup.board.id,
      name: taskGroup.board.name,
      project: {
        id: taskGroup.board.project.id,
        name: taskGroup.board.project.name,
      },
    },
    tasks: taskGroup.tasks.map(convertToDomainTaskFromApiTask),
  };
};
