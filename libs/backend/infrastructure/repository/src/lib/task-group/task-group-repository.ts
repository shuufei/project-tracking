import type { ITaskGroupRepository } from '@bison/backend/domain';
import { mockTaskGroupRepositoryReturnValues } from '@bison/backend/domain';
import { DynamoDB } from 'aws-sdk';
import { DynamoDbClient } from '../dynamodb/dynamodb-client';
import {
  boardIdIndexName,
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
    const results = await DynamoDbClient.getClient().query(params).promise();
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
    return mockTaskGroupRepositoryReturnValues.getById;
  }

  async create(
    ...args: Parameters<ITaskGroupRepository['create']>
  ): ReturnType<ITaskGroupRepository['create']> {
    return mockTaskGroupRepositoryReturnValues.create;
  }

  async update(
    ...args: Parameters<ITaskGroupRepository['update']>
  ): ReturnType<ITaskGroupRepository['update']> {
    return mockTaskGroupRepositoryReturnValues.update;
  }

  async delete(
    ...args: Parameters<ITaskGroupRepository['delete']>
  ): ReturnType<ITaskGroupRepository['delete']> {
    return mockTaskGroupRepositoryReturnValues.delete;
  }
}
