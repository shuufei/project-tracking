import { IProjectRepository } from '@bison/backend/domain';
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
  projectAdminUserIdIndexName,
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
    const listByUserIdParams: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: gsi1Name,
      KeyConditionExpression: 'SK = :sk',
      ExpressionAttributeValues: {
        ':sk': {
          S: addUserIdPrefix(userId),
        },
      },
    };
    const listByAdminUserIdParams: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: projectAdminUserIdIndexName,
      KeyConditionExpression:
        '#adminUserId = :adminUserId and begins_with(SK, :sk)',
      ExpressionAttributeNames: {
        '#adminUserId': 'Project-adminUserId',
      },
      ExpressionAttributeValues: {
        ':adminUserId': {
          S: userId,
        },
        ':sk': {
          S: 'Project-',
        },
      },
    };
    const listByUserIdResult = await DynamoDBClient.getClient()
      .query(listByUserIdParams)
      .promise();
    const listByUserIdItems = (listByUserIdResult.Items ??
      []) as ProjectUserItem[];
    const listByAdminUserIdResult = await DynamoDBClient.getClient()
      .query(listByAdminUserIdParams)
      .promise();
    const listByAdminUserIdItems = (listByAdminUserIdResult.Items ??
      []) as ProjectItem[];
    const projects = [
      ...listByUserIdItems
        .filter(isProjectUserItem)
        .map(convertToDomainProjectFromDbProjectUserMappingItem),
      ...listByAdminUserIdItems
        .filter(isProjectItem)
        .map(convertToDomainProjectFromDbProjectItem),
    ];
    const projectIds = Array.from(
      new Set(projects.map((project) => project.id))
    );
    return {
      projects: projectIds
        .map((id) => projects.find((v) => v.id == id))
        .filter((v): v is NonNullable<typeof v> => v != null),
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
    const results = await DynamoDBClient.getClient()
      .query({
        TableName: tableName,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': {
            S: addProjectIdPrefix(id),
          },
        },
      })
      .promise();
    const items = (results.Items ?? []) as ProjectUserItem[];
    const params: DynamoDB.BatchWriteItemInput = {
      RequestItems: {
        [tableName]: items.map((item) => ({
          DeleteRequest: {
            Key: {
              PK: {
                S: item.PK.S,
              },
              SK: {
                S: item.SK.S,
              },
            },
          },
        })),
      },
    };
    await DynamoDBClient.getClient().batchWriteItem(params).promise();
    return;
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
