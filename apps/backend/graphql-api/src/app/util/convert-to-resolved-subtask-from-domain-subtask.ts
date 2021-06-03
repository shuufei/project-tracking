import { Subtask } from '@bison/shared/domain';
import { ResolvedSubtask } from '../resolvers/resolved-value-type';

export const convertToResolvedSubtaskFromDomainSubtask = (
  subtask: Subtask
): ResolvedSubtask => {
  return {
    id: subtask.id,
    title: subtask.title,
    description: subtask.description,
    isCompleted: subtask.isDone,
    workTimeSec: subtask.workTimeSec,
    scheduledTimeSec: subtask.scheduledTimeSec,
    assign:
      subtask.assignUserId !== undefined
        ? { id: subtask.assignUserId }
        : undefined,
    task: {
      id: subtask.taskId,
    },
  };
};
