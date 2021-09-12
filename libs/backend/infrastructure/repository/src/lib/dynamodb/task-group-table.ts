import { TaskGroup } from '@bison/shared/domain';
import { DynamoDB } from 'aws-sdk';
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
  tasksOrder?: { L: { S: string }[] };
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
    tasksOrder: item.tasksOrder?.L.map((v) => v.S) ?? [],
    createdAt: Number(item.createdAt.N),
  };
};

export const convertToDbTaskGroupItemFromDomainTaskGroup = (
  taskGroup: TaskGroup
): DynamoDB.AttributeMap => {
  const item: DynamoDB.AttributeMap = {
    id: { S: taskGroup.id },
    title: { S: taskGroup.title },
    status: { S: taskGroup.status },
    boardId: { S: taskGroup.boardId },
    createdAt: { N: String(taskGroup.createdAt) },
  };
  if (taskGroup.description != null) {
    item.description = {
      S: taskGroup.description,
    };
  }
  if (taskGroup.scheduledTimeSec != null) {
    item.scheduledTimeSec = { N: String(taskGroup.scheduledTimeSec) };
  }
  if (taskGroup.assignUserId != null) {
    item.assignUserId = { S: taskGroup.assignUserId };
  }
  if (taskGroup.tasksOrder.length > 0) {
    item.tasksOrder = { L: taskGroup.tasksOrder.map((v) => ({ S: v })) };
  }
  return item;
};
