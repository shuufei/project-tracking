import { Board, BoardTaskType } from '@bison/shared/domain';
import { DynamoDB } from 'aws-sdk';
export const tableName = 'Board';

export const projectIdIndexName = 'ProjectIdIndex';

export type BoardItem = {
  id: { S: string };
  name: { S: string };
  description?: { S: string };
  projectId: { S: string };
  tasksOrder?: {
    L: {
      M: {
        taskId: { S: string };
        type: { S: string };
      };
    }[];
  };
  createdAt: { N: string };
};

export const convertToDomainBoardFromDbBoardItem = (item: BoardItem): Board => {
  return {
    id: item.id.S,
    name: item.name.S,
    description: item.description?.S,
    projectId: item.projectId.S,
    tasksOrder:
      item.tasksOrder?.L.map((value) => ({
        taskId: value.M.taskId.S,
        type: value.M.type.S as BoardTaskType,
      })) ?? [],
    createdAt: Number(item.createdAt.N),
  };
};

export const convertToDbBoardItemFromDomainBoard = (
  board: Board
): DynamoDB.AttributeMap => {
  const item: DynamoDB.AttributeMap = {
    id: { S: board.id },
    name: { S: board.name },
    projectId: { S: board.projectId },
    createdAt: { N: String(board.createdAt) },
  };
  if (board.description != null) {
    item.description = {
      S: board.description,
    };
  }
  if (board.tasksOrder.length > 0) {
    item.tasksOrder = {
      L: board.tasksOrder.map((value) => ({
        M: {
          taskId: {
            S: value.taskId,
          },
          type: {
            S: value.type,
          },
        },
      })),
    };
  }
  return item;
};
