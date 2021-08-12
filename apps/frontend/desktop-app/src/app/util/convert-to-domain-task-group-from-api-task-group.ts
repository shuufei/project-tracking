import { TaskGroup } from '@bison/frontend/domain';
import { TaskGroup as ApiTaskGroup } from '@bison/shared/schema';
import { convertToDomainStatusFromApiStatus } from './convert-to-domain-status-from-api-status';

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
      projectId: taskGroup.board.project.id,
    },
    tasks: taskGroup.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: convertToDomainStatusFromApiStatus(task.status),
      workTimeSec: task.workTimeSec,
      scheduledTimeSec: task.scheduledTimeSec,
      workStartDateTimestamp: task.workStartDateTimestamp,
      assignUser: task.assign,
    })),
  };
};
