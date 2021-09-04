import { ISubtaskRepository } from '@bison/backend/domain';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '../dynamodb/dynamodb-client';
import {
  convertToDbSubtaskItemFromSubtask,
  convertToDomainSubtaskFromDbSubtaskItem,
  SubtaskItem,
  tableName,
  taskIdIndexName,
} from '../dynamodb/subtask-table';

export class SubtaskRepository implements ISubtaskRepository {
  async listByTaskId(
    ...args: Parameters<ISubtaskRepository['listByTaskId']>
  ): ReturnType<ISubtaskRepository['listByTaskId']> {
    const [taskId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: taskIdIndexName,
      KeyConditionExpression: 'taskId = :taskId',
      ExpressionAttributeValues: {
        ':taskId': {
          S: taskId,
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as SubtaskItem[];
    return { subtasks: items.map(convertToDomainSubtaskFromDbSubtaskItem) };
  }

  async getById(
    ...args: Parameters<ISubtaskRepository['getById']>
  ): ReturnType<ISubtaskRepository['getById']> {
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
      throw new Error('Subtask is undefined');
    }
    return convertToDomainSubtaskFromDbSubtaskItem(item as SubtaskItem);
  }

  async create(
    ...args: Parameters<ISubtaskRepository['create']>
  ): ReturnType<ISubtaskRepository['create']> {
    const [subtask] = args;
    const item = convertToDbSubtaskItemFromSubtask(subtask);
    const params: DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await DynamoDBClient.getClient().putItem(params).promise();
    return subtask;
  }

  async update(
    ...args: Parameters<ISubtaskRepository['update']>
  ): ReturnType<ISubtaskRepository['update']> {
    const [subtask] = args;
    const currentSubtask = await this.getById(subtask.id);
    const updatedSubtask = {
      ...currentSubtask,
      ...subtask,
    };
    const item = convertToDbSubtaskItemFromSubtask(updatedSubtask);
    const params: DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await DynamoDBClient.getClient().putItem(params).promise();
    return updatedSubtask;
  }

  async delete(
    ...args: Parameters<ISubtaskRepository['delete']>
  ): ReturnType<ISubtaskRepository['delete']> {
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
}
