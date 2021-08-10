import { Subtask as DomainSubtask } from '@bison/frontend/domain';
import { Subtask } from '@bison/shared/schema';

export const convertToDomainSubtaskFromApiSubtask = (
  subtask: Subtask
): DomainSubtask => {
  return {
    id: subtask.id,
    title: subtask.title,
    description: subtask.description,
    isDone: subtask.isDone,
    taskId: subtask.task.id,
    scheduledTimeSec: subtask.scheduledTimeSec,
    workTimeSec: subtask.workTimeSec,
    assignUser: subtask.assign,
  };
};
