import { Task as DomainTask } from '@bison/frontend/domain';
import { Task } from '@bison/shared/schema';
import { convertToDomainStatusFromApiStatus } from './convert-to-domain-status-from-api-status';
import { convertToDomainSubtaskFromApiSubtask } from './convert-to-domain-subtask-from-api-subtask';

export const convertToDomainTaskFromApiTask = (task: Task): DomainTask => {
  const domainTask: DomainTask = {
    id: task.id,
    title: task.title,
    description: task.description,
    status: convertToDomainStatusFromApiStatus(task.status),
    workTimeSec: task.workTimeSec,
    scheduledTimeSec: task.scheduledTimeSec,
    subtasksOrder: task.subtasksOrder ?? [],
    workStartDateTimestamp: task.workStartDateTimestamp,
    board: {
      id: task.board.id,
      project: {
        id: task.board.project.id,
        name: task.board.project.name,
      },
    },
    assignUser: task.assign,
    taskGroup:
      task.taskGroup != null
        ? { id: task.taskGroup.id, title: task.taskGroup.title }
        : undefined,
    subtasks: task.subtasks.map(convertToDomainSubtaskFromApiSubtask),
    createdAt: task.createdAt,
  };
  return domainTask;
};
