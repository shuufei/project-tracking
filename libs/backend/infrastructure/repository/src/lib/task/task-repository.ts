import { ITaskRepository } from '@bison/backend/domain';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '../dynamodb/dynamodb-client';
import { boardIdIndexName } from '../dynamodb/task-group-table';
import {
  convertToDbTaskItemFromDomainTask,
  convertToDomainTaskFromDbTaskItem,
  tableName,
  taskGroupIdIndexName,
  TaskItem,
} from '../dynamodb/task-table';

export class TaskRepository implements ITaskRepository {
  async listByTaskGroupId(
    ...args: Parameters<ITaskRepository['listByTaskGroupId']>
  ): ReturnType<ITaskRepository['listByTaskGroupId']> {
    const [taskGroupId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: taskGroupIdIndexName,
      KeyConditionExpression: 'taskGroupId = :taskGroupId',
      ExpressionAttributeValues: {
        ':taskGroupId': {
          S: taskGroupId,
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as TaskItem[];
    return { tasks: items.map(convertToDomainTaskFromDbTaskItem) };
  }

  async listSoloTasksByBoardId(
    ...args: Parameters<ITaskRepository['listSoloTasksByBoardId']>
  ): ReturnType<ITaskRepository['listSoloTasksByBoardId']> {
    const [boardId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: boardIdIndexName,
      KeyConditionExpression: 'boardId = :boardId',
      ExpressionAttributeValues: {
        ':boardId': {
          S: boardId,
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as TaskItem[];
    return {
      tasks: items
        .map(convertToDomainTaskFromDbTaskItem)
        .filter((task) => task.taskGroupId == null),
    };
  }

  async getById(
    ...args: Parameters<ITaskRepository['getById']>
  ): ReturnType<ITaskRepository['getById']> {
    const [id] = args;
    const params: DynamoDB.GetItemInput = {
      TableName: tableName,
      Key: {
        id: {
          S: id,
        },
      },
    };
    const result = await DynamoDBClient.getClient().getItem(params).promise();
    const item = result.Item;
    if (item == null) {
      throw new Error('Task is undefined');
    }
    return convertToDomainTaskFromDbTaskItem(item as TaskItem);
  }

  async create(
    ...args: Parameters<ITaskRepository['create']>
  ): ReturnType<ITaskRepository['create']> {
    const [task] = args;
    const item = convertToDbTaskItemFromDomainTask(task);
    const params: DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await DynamoDBClient.getClient().putItem(params).promise();
    return task;
  }

  async delete(
    ...args: Parameters<ITaskRepository['delete']>
  ): ReturnType<ITaskRepository['delete']> {
    const [id] = args;
    const params: DynamoDB.Delete = {
      TableName: tableName,
      Key: {
        id: { S: id },
      },
    };
    await DynamoDBClient.getClient().deleteItem(params).promise();
    return;
  }

  async update(
    ...args: Parameters<ITaskRepository['update']>
  ): ReturnType<ITaskRepository['update']> {
    const [task] = args;
    const item = convertToDbTaskItemFromDomainTask(task);
    const params: DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await DynamoDBClient.getClient().putItem(params).promise();
    return task;
  }
}
