import { TaskGroup } from '@bison/shared/domain';
import { ResolvedTaskGroup } from '../resolvers/resolved-value-type';
import { convertToApiStatusFromDomainStatus } from './convert-to-status-from-domain-status';

export const convertToResolvedTaskGroupFromDomainTaskGroup = (
  taskGroup: TaskGroup
): ResolvedTaskGroup => {
  return {
    id: taskGroup.id,
    title: taskGroup.title,
    description: taskGroup.description,
    status: convertToApiStatusFromDomainStatus(taskGroup.status),
    scheduledTimeSec: taskGroup.scheduledTimeSec,
    tasksOrder: taskGroup.tasksOrder,
    assign: taskGroup.assignUserId ? { id: taskGroup.assignUserId } : undefined,
    board: {
      id: taskGroup.boardId,
    },
    createdAt: taskGroup.createdAt,
  };
};
