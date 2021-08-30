import type { ITaskGroupRepository } from '@bison/backend/domain';
import { mockTaskGroupRepositoryReturnValues } from '@bison/backend/domain';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '../dynamodb/dynamodb-client';
import {
  boardIdIndexName,
  convertToDbTaskGroupItemFromDomainTaskGroup,
  convertToDomainTaskGroupFromDbTaskGroupItem,
  tableName,
  TaskGroupItem,
} from '../dynamodb/task-group-table';

export class TaskGroupRepository implements ITaskGroupRepository {
  async listByBoardId(
    ...args: Parameters<ITaskGroupRepository['listByBoardId']>
  ): ReturnType<ITaskGroupRepository['listByBoardId']> {
    const [id] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: boardIdIndexName,
      KeyConditionExpression: 'boardId = :boardId',
      ExpressionAttributeValues: {
        ':boardId': {
          S: id,
        },
      },
    };
    const results = await DynamoDBClient.getClient().query(params).promise();
    const items = (results.Items ?? []) as TaskGroupItem[];
    return {
      taskGroups: items.map((item) =>
        convertToDomainTaskGroupFromDbTaskGroupItem(item)
      ),
    };
  }

  async getById(
    ...args: Parameters<ITaskGroupRepository['getById']>
  ): ReturnType<ITaskGroupRepository['getById']> {
    const [id] = args;
    const params: DynamoDB.GetItemInput = {
      TableName: tableName,
      Key: {
        id: {
          S: id,
        },
      },
    };
    const results = await DynamoDBClient.getClient().getItem(params).promise();
    const item = results.Item;
    if (item == null) {
      throw new Error('TaskGroupItem is undefined');
    }
    return convertToDomainTaskGroupFromDbTaskGroupItem(item as TaskGroupItem);
  }

  async create(
    ...args: Parameters<ITaskGroupRepository['create']>
  ): ReturnType<ITaskGroupRepository['create']> {
    const [taskGroup] = args;
    const item = convertToDbTaskGroupItemFromDomainTaskGroup(taskGroup);
    const params: DynamoDB.PutItemInput = { TableName: tableName, Item: item };
    await DynamoDBClient.getClient().putItem(params).promise();
    return taskGroup;
  }

  async update(
    ...args: Parameters<ITaskGroupRepository['update']>
  ): ReturnType<ITaskGroupRepository['update']> {
    const [taskGroup] = args;
    const item = convertToDbTaskGroupItemFromDomainTaskGroup(taskGroup);
    const params: DynamoDB.PutItemInput = { TableName: tableName, Item: item };
    await DynamoDBClient.getClient().putItem(params).promise();
    return taskGroup;
  }

  async delete(
    ...args: Parameters<ITaskGroupRepository['delete']>
  ): ReturnType<ITaskGroupRepository['delete']> {
    return mockTaskGroupRepositoryReturnValues.delete;
  }
}
