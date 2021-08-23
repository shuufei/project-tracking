import { Task as DomainTask } from '@bison/frontend/domain';
import { Task } from '@bison/shared/schema';
import { convertToDomainSubtaskFromApiSubtask } from './convert-to-domain-subtask-from-api-subtask';

export const convertToDomainTaskFromApiTask = (task: Task): DomainTask => {
  const domainTask: DomainTask = {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    workTimeSec: task.workTimeSec,
    scheduledTimeSec: task.scheduledTimeSec,
    subtasksOrder: task.subtasksOrder ?? [],
    workStartDateTimestamp: task.workStartDateTimestamp,
    board: {
      id: task.board.id,
      name: task.board.name,
      description: task.board.description,
      project: {
        id: task.board.project.id,
        name: task.board.project.name,
      },
    },
    assignUser: task.assign,
    taskGroup: task.taskGroup,
    subtasks: task.subtasks.map(convertToDomainSubtaskFromApiSubtask),
  };
  return domainTask;
};
