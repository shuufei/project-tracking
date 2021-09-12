import { Task } from '@bison/shared/domain';
import { DynamoDB } from 'aws-sdk';
export const tableName = 'Task';

export const taskGroupIdIndexName = 'TaskGroupIdIndex';

export const boardIdIndexName = 'BoardIdIndex';

export type TaskItem = {
  id: { S: string };
  title: { S: string };
  description?: { S: string };
  status: { S: string };
  assignUserId?: { S: string };
  boardId: { S: string };
  taskGroupId?: { S: string };
  workTimeSec: { N: string };
  scheduledTimeSec?: { N: string };
  workStartDateTimestamp?: { N: string };
  createdAt: { N: string };
  subtasksOrder?: { L: { S: string }[] };
};

export const convertToDomainTaskFromDbTaskItem = (item: TaskItem): Task => {
  return {
    id: item.id.S,
    title: item.title.S,
    description: item.description?.S,
    status: item.status.S as Task['status'],
    assignUserId: item.assignUserId?.S,
    boardId: item.boardId.S,
    taskGroupId: item.taskGroupId?.S,
    workTimeSec: Number(item.workTimeSec.N),
    scheduledTimeSec: item.scheduledTimeSec && Number(item.scheduledTimeSec.N),
    workStartDateTimestamp:
      item.workStartDateTimestamp && Number(item.workStartDateTimestamp.N),
    subtasksOrder: item.subtasksOrder?.L.map((v) => v.S) ?? [],
    createdAt: Number(item.createdAt.N),
  };
};

export const convertToDbTaskItemFromDomainTask = (
  task: Task
): DynamoDB.AttributeMap => {
  const item: DynamoDB.AttributeMap = {
    id: { S: task.id },
    title: { S: task.title },
    status: { S: task.status },
    boardId: { S: task.boardId },
    workTimeSec: { N: String(task.workTimeSec) },
    createdAt: { N: String(new Date().valueOf()) },
  };
  if (task.description != null) {
    item.description = {
      S: task.description,
    };
  }
  if (task.scheduledTimeSec != null) {
    item.scheduledTimeSec = { N: String(task.scheduledTimeSec) };
  }
  if (task.workStartDateTimestamp != null) {
    item.workStartDateTimestamp = { N: String(task.workStartDateTimestamp) };
  }
  if (task.assignUserId != null) {
    item.assignUserId = { S: task.assignUserId };
  }
  if (task.taskGroupId != null) {
    item.taskGroupId = { S: task.taskGroupId };
  }
  if (task.subtasksOrder.length > 0) {
    item.subtasksOrder = { L: task.subtasksOrder.map((v) => ({ S: v })) };
  }
  return item;
};
