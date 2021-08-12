import { Task as DomainTask } from '@bison/frontend/domain';
import { Task } from '@bison/shared/schema';

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
    subtasks:
      task.subtasks?.map((subtask) => {
        return {
          id: subtask.id,
          title: subtask.title,
          description: subtask.description,
          isDone: subtask.isDone,
          scheduledTimeSec: subtask.scheduledTimeSec,
          workTimeSec: subtask.workTimeSec,
          workStartDateTimestamp: subtask.workStartDateTimestamp,
          taskId: task.id,
          assignUser: subtask.assign,
        };
      }) ?? [],
  };
  return domainTask;
};
