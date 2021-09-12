import { Task } from '@bison/shared/domain';
import { ResolvedTask } from '../resolvers/resolved-value-type';
import { convertToApiStatusFromDomainStatus } from './convert-to-status-from-domain-status';

export const convertToResolvedTaskFromDomainTask = (
  task: Task
): ResolvedTask => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: convertToApiStatusFromDomainStatus(task.status),
    workTimeSec: task.workTimeSec,
    scheduledTimeSec: task.scheduledTimeSec,
    subtasksOrder: task.subtasksOrder,
    workStartDateTimestamp: task.workStartDateTimestamp,
    assign: task.assignUserId != null ? { id: task.assignUserId } : undefined,
    board: {
      id: task.boardId,
    },
    taskGroup: task.taskGroupId != null ? { id: task.taskGroupId } : undefined,
    createdAt: task.createdAt,
  };
};
