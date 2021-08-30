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
