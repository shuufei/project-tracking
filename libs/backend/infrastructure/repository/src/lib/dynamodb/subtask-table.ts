import { Subtask } from '@bison/shared/domain';
import { DynamoDB } from 'aws-sdk';
export const tableName = 'Subtask';

export const taskIdIndexName = 'TaskIdIndex';

export type SubtaskItem = {
  id: { S: string };
  title: { S: string };
  description?: { S: string };
  isDone: { BOOL: boolean };
  assignUserId?: { S: string };
  taskId: { S: string };
  workTimeSec: { N: string };
  scheduledTimeSec?: { N: string };
  workStartDateTimestamp?: { N: string };
  createdAt: { N: string };
};

export const convertToDomainSubtaskFromDbSubtaskItem = (
  item: SubtaskItem
): Subtask => {
  return {
    id: item.id.S,
    title: item.title.S,
    description: item.description?.S,
    isDone: item.isDone.BOOL,
    assignUserId: item.assignUserId?.S,
    workTimeSec: Number(item.workTimeSec.N),
    scheduledTimeSec: item.scheduledTimeSec && Number(item.scheduledTimeSec.N),
    workStartDateTimestamp:
      item.workStartDateTimestamp && Number(item.workStartDateTimestamp.N),
    taskId: item.taskId.S,
    createdAt: Number(item.createdAt.N),
  };
};

export const convertToDbSubtaskItemFromSubtask = (
  subtask: Subtask
): DynamoDB.AttributeMap => {
  const item: DynamoDB.AttributeMap = {
    id: { S: subtask.id },
    title: { S: subtask.title },
    isDone: { BOOL: subtask.isDone },
    taskId: { S: subtask.taskId },
    workTimeSec: { N: String(subtask.workTimeSec) },
    createdAt: { N: String(subtask.createdAt) },
  };
  if (subtask.description != null) {
    item.description = {
      S: subtask.description,
    };
  }
  if (subtask.scheduledTimeSec != null) {
    item.scheduledTimeSec = { N: String(subtask.scheduledTimeSec) };
  }
  if (subtask.workStartDateTimestamp != null) {
    item.workStartDateTimestamp = { N: String(subtask.workStartDateTimestamp) };
  }
  if (subtask.assignUserId != null) {
    item.assignUserId = { S: subtask.assignUserId };
  }
  return item;
};
