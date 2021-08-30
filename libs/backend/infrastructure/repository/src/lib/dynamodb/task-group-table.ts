import { TaskGroup } from '@bison/shared/domain';
export const tableName = 'TaskGroup';
export const boardIdIndexName = 'BoardIdIndex';

export type TaskGroupItem = {
  id: { S: string };
  title: { S: string };
  description?: { S: string };
  status: { S: string };
  boardId: { S: string };
  scheduledTimeSec?: { N: string };
  assignUserId?: { S: string };
  createdAt: { N: string };
  tasksOrder?: { SS: string[] };
};

export const convertToDomainTaskGroupFromDbTaskGroupItem = (
  item: TaskGroupItem
): TaskGroup => {
  return {
    id: item.id.S,
    title: item.title.S,
    description: item.description?.S,
    status: item.status.S as TaskGroup['status'],
    boardId: item.boardId.S,
    scheduledTimeSec: Number(item.scheduledTimeSec?.N),
    assignUserId: item.assignUserId?.S,
    tasksOrder: item.tasksOrder?.SS ?? [],
  };
};

export const convertToDbTaskGroupItemFromDomainTaskGroup = (
  taskGroup: TaskGroup
): TaskGroupItem => {
  return {
    id: { S: taskGroup.id },
    title: { S: taskGroup.title },
    description:
      taskGroup.description != null ? { S: taskGroup.description } : undefined,
    status: { S: taskGroup.status },
    boardId: { S: taskGroup.boardId },
    scheduledTimeSec:
      taskGroup.scheduledTimeSec != null
        ? { N: String(taskGroup.scheduledTimeSec) }
        : undefined,
    assignUserId:
      taskGroup.assignUserId != null
        ? { S: taskGroup.assignUserId }
        : undefined,
    createdAt: { N: String(new Date().valueOf()) },
  };
};
