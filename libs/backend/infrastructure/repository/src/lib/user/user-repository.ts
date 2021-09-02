import { IUserRepository } from '@bison/backend/domain';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '../dynamodb/dynamodb-client';
import {
  addProjectIdPrefix,
  addUserIdPrefix,
  convertToDomainUserFromDbProjectUserMappingItem,
  convertToDomainUserWithIdpUserIdFromDbUserItem,
  isProjectUserItem,
  ProjectUserItem,
  tableName,
  typeIndexName,
  userIdpUserIdIndexName,
  UserItem,
} from '../dynamodb/project-user-table';

export class UserRepository implements IUserRepository {
  async getByIdpUserId(
    ...args: Parameters<IUserRepository['getByIdpUserId']>
  ): ReturnType<IUserRepository['getByIdpUserId']> {
    const [idpUserId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: userIdpUserIdIndexName,
      KeyConditionExpression:
        '#idpUserId = :idpUserId and begins_with(PK, :pk)',
      ExpressionAttributeNames: {
        '#idpUserId': 'User-idpUserId',
      },
      ExpressionAttributeValues: {
        ':idpUserId': {
          S: idpUserId,
        },
        ':pk': {
          S: 'User-',
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const item = result.Items?.[0];
    if (item == null) {
      throw new Error('User is undefined');
    }
    return convertToDomainUserWithIdpUserIdFromDbUserItem(item as UserItem);
  }

  async getById(
    ...args: Parameters<IUserRepository['getById']>
  ): ReturnType<IUserRepository['getById']> {
    const [id] = args;
    const params: DynamoDB.GetItemInput = {
      TableName: tableName,
      Key: {
        PK: {
          S: addUserIdPrefix(id),
        },
        SK: {
          S: addUserIdPrefix(id),
        },
      },
    };
    const result = await DynamoDBClient.getClient().getItem(params).promise();
    const item = result.Item;
    if (item == null) {
      throw new Error('User is undefined');
    }
    return convertToDomainUserWithIdpUserIdFromDbUserItem(item as UserItem);
  }

  async listByProjectId(
    ...args: Parameters<IUserRepository['listByProjectId']>
  ): ReturnType<IUserRepository['listByProjectId']> {
    const [projectId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': {
          S: addProjectIdPrefix(projectId),
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as ProjectUserItem[];
    return {
      users: items
        .filter(isProjectUserItem)
        .map(convertToDomainUserFromDbProjectUserMappingItem),
    };
  }

  async list(): ReturnType<IUserRepository['list']> {
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: typeIndexName,
      KeyConditionExpression: '#type = :type and begins_with(PK, :pk)',
      ExpressionAttributeNames: { '#type': 'type' },
      ExpressionAttributeValues: {
        ':type': {
          S: 'user',
        },
        ':pk': {
          S: 'User-',
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as UserItem[];
    return { users: items.map(convertToDomainUserWithIdpUserIdFromDbUserItem) };
  }
}
