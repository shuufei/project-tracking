import { IBoardRepository } from '@bison/backend/domain';
import { DynamoDB } from 'aws-sdk';
import {
  BoardItem,
  convertToDbBoardItemFromDomainBoard,
  convertToDomainBoardFromDbBoardItem,
  projectIdIndexName,
  tableName,
} from '../dynamodb/board-table';
import { DynamoDBClient } from '../dynamodb/dynamodb-client';

export class BoardRepository implements IBoardRepository {
  async listByProjectId(
    ...args: Parameters<IBoardRepository['listByProjectId']>
  ): ReturnType<IBoardRepository['listByProjectId']> {
    const [projectId] = args;
    const params: DynamoDB.QueryInput = {
      TableName: tableName,
      IndexName: projectIdIndexName,
      KeyConditionExpression: 'projectId = :projectId',
      ExpressionAttributeValues: {
        ':projectId': {
          S: projectId,
        },
      },
    };
    const result = await DynamoDBClient.getClient().query(params).promise();
    const items = (result.Items ?? []) as BoardItem[];
    return { boards: items.map(convertToDomainBoardFromDbBoardItem) };
  }

  async getById(
    ...args: Parameters<IBoardRepository['getById']>
  ): ReturnType<IBoardRepository['getById']> {
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
      throw new Error('Board is undefined');
    }
    return convertToDomainBoardFromDbBoardItem(item as BoardItem);
  }

  async create(
    ...args: Parameters<IBoardRepository['create']>
  ): ReturnType<IBoardRepository['create']> {
    const [board] = args;
    const item = convertToDbBoardItemFromDomainBoard(board);
    const params: DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await DynamoDBClient.getClient().putItem(params).promise();
    return board;
  }

  async delete(
    ...args: Parameters<IBoardRepository['delete']>
  ): ReturnType<IBoardRepository['delete']> {
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
    ...args: Parameters<IBoardRepository['update']>
  ): ReturnType<IBoardRepository['update']> {
    const [board] = args;
    const currentBoard = await this.getById(board.id);
    const updatedBoard = {
      ...currentBoard,
      ...board,
    };
    const item = convertToDbBoardItemFromDomainBoard(updatedBoard);
    const params: DynamoDB.PutItemInput = {
      TableName: tableName,
      Item: item,
    };
    await DynamoDBClient.getClient().putItem(params).promise();
    return updatedBoard;
  }
}
