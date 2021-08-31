import {
  IProjectRepository,
  mockProjectRepositoryReturnValues,
} from '@bison/backend/domain';
import { Project, UserWithIdpUserId } from '@bison/shared/domain';
import { Logger } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '../dynamodb/dynamodb-client';
import {
  addProjectIdPrefix,
  addUserIdPrefix,
  convertToDbProjectItemFromDomainProject,
  convertToDbProjectUserMappingItemFromDomainProjectUser,
  convertToDomainProjectFromDbProjectItem,
  convertToDomainProjectFromDbProjectUserMappingItem,
  convertToDomainUserWithIdpUserIdFromDbUserItem,
  gsi1Name,
  isProjectItem,
  isProjectUserItem,
  isUserItem,
  ProjectItem,
  ProjectUserItem,
  tableName,
  UserItem,
} from '../dynamodb/project-user-table';

export class ProjectRepository implements IProjectRepository {
  async getById(
    ...args: Parameters<IProjectRepository['getById']>
  ): ReturnType<IProjectRepository['getById']> {
    const [id] = args;
    const params: DynamoDB.GetItemInput = {
      TableName: tableName,
      Key: {
        PK: {
          S: addProjectIdPrefix(id),
        },
        SK: {
          S: addProjectIdPrefix(id),
        },
      },
    };
    const result = await DynamoDBClient.getClient().getItem(params).promise();
    const item = result.Item;
    if (item == null) {
      throw new Error('Project is undefined: ' + id);
    }
    return convertToDomainProjectFromDbProjectItem(item as ProjectItem);
  }

  async listByUserId(
    ...args: Parameters<IProjectRepository['listByUserId']>
  ): ReturnType<IProjectRepository['listByUserId']> {
    const [userId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: gsi1Name,
      KeyConditionExpression: 'SK = :sk',
      ExpressionAttributeValues: {
        ':sk': {
          S: addUserIdPrefix(userId),
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as ProjectUserItem[];
    return {
      projects: items
        .filter(isProjectUserItem)
        .map(convertToDomainProjectFromDbProjectUserMappingItem),
    };
  }

  async create(
    ...args: Parameters<IProjectRepository['create']>
  ): ReturnType<IProjectRepository['create']> {
    const [project] = args;
    const item = convertToDbProjectItemFromDomainProject(project);
    const params: DynamoDB.PutItemInput = { TableName: tableName, Item: item };
    await DynamoDBClient.getClient().putItem(params).promise();
    return project;
  }

  async update(
    ...args: Parameters<IProjectRepository['update']>
  ): ReturnType<IProjectRepository['update']> {
    const [project] = args;
    const queryProjectsParams: DynamoDB.QueryInput = {
      TableName: tableName,
      KeyConditionExpression: 'PK = :projectId',
      ExpressionAttributeValues: {
        ':projectId': {
          S: addProjectIdPrefix(project.id),
        },
      },
    };
    const queryResult = await DynamoDBClient.getClient()
      .query(queryProjectsParams)
      .promise();
    Logger.log(queryResult);
    const items = queryResult.Items ?? [];
    const projectItem = convertToDbProjectItemFromDomainProject(project);
    const batchParams: DynamoDB.BatchWriteItemInput = {
      RequestItems: {
        [tableName]: items.map((item) => {
          const putRequestItem: DynamoDB.AttributeMap = {
            ...item,
            ...projectItem,
            PK: item.PK,
            SK: item.SK,
          };
          return {
            PutRequest: {
              Item: putRequestItem,
            },
          };
        }),
      },
    };
    await DynamoDBClient.getClient().batchWriteItem(batchParams).promise();
    return project;
  }

  async delete(
    ...args: Parameters<IProjectRepository['delete']>
  ): ReturnType<IProjectRepository['delete']> {
    const [id] = args;
    const params: DynamoDB.Delete = {
      TableName: tableName,
      Key: {
        PK: { S: addProjectIdPrefix(id) },
        SK: { S: addProjectIdPrefix(id) },
      },
    };
    await DynamoDBClient.getClient().deleteItem(params).promise();
    return mockProjectRepositoryReturnValues.delete;
  }

  async addMembers(
    ...args: Parameters<IProjectRepository['addMembers']>
  ): ReturnType<IProjectRepository['addMembers']> {
    const [id, userIds] = args;
    if (userIds.length <= 0) return;
    const { project, users } = await this.getProjectAndUsers(id, userIds);
    const putRequestItems: DynamoDB.AttributeMap[] = users.map((user) =>
      convertToDbProjectUserMappingItemFromDomainProjectUser(project, user)
    );
    const params: DynamoDB.BatchWriteItemInput = {
      RequestItems: {
        [tableName]: putRequestItems.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    };
    await DynamoDBClient.getClient().batchWriteItem(params).promise();
    return;
  }

  async removeMembers(
    ...args: Parameters<IProjectRepository['removeMembers']>
  ): ReturnType<IProjectRepository['removeMembers']> {
    const [id, userIds] = args;
    if (userIds.length <= 0) return;
    const params: DynamoDB.BatchWriteItemInput = {
      RequestItems: {
        [tableName]: userIds.map((userId) => ({
          DeleteRequest: {
            Key: {
              PK: {
                S: addProjectIdPrefix(id),
              },
              SK: {
                S: addUserIdPrefix(userId),
              },
            },
          },
        })),
      },
    };
    await DynamoDBClient.getClient().batchWriteItem(params).promise();
    return;
  }

  private async getProjectAndUsers(
    projectId: string,
    userIds: string[]
  ): Promise<{ project: Project; users: UserWithIdpUserId[] }> {
    const batchGetParams: DynamoDB.BatchGetItemInput = {
      RequestItems: {
        [tableName]: {
          Keys: [
            ...userIds.map((userId) => ({
              PK: { S: addUserIdPrefix(userId) },
              SK: { S: addUserIdPrefix(userId) },
            })),
            {
              PK: { S: addProjectIdPrefix(projectId) },
              SK: { S: addProjectIdPrefix(projectId) },
            },
          ],
        },
      },
    };
    const result = await DynamoDBClient.getClient()
      .batchGetItem(batchGetParams)
      .promise();
    if (result.Responses == null) {
      throw new Error('Responses is undefined');
    }
    const projectItem = result.Responses[tableName].find((item) =>
      isProjectItem(item as ProjectUserItem)
    );
    if (projectItem == null) {
      throw new Error('Project is undefined: ' + projectItem);
    }
    const project = convertToDomainProjectFromDbProjectItem(
      projectItem as ProjectItem
    );
    const users = result.Responses[tableName]
      .filter((item) => isUserItem(item as ProjectUserItem))
      .map((item) =>
        convertToDomainUserWithIdpUserIdFromDbUserItem(item as UserItem)
      );
    return { project, users };
  }
}
