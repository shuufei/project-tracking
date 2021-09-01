import { DynamoDB } from 'aws-sdk';
import { boardItems } from './data/board';
import { projectUserItems } from './data/project-user';
import { subtaskItems } from './data/subtask';
import { taskItems } from './data/task';
import { taskGroupItems } from './data/task-group';

type PutRequest = DynamoDB.BatchWriteItemInput['RequestItems'][string][number]['PutRequest'];

const dynamodb = new DynamoDB({
  endpoint: 'http://localhost:8000',
  region: 'us-west-2',
});

const importProjectUserSampleData = async () => {
  const putRequests: PutRequest[] = projectUserItems.map((item) => {
    const request = {
      Item: {
        PK: {
          S: item.PK,
        },
        SK: {
          S: item.SK,
        },
      },
    };
    const attributes = [
      'Project-name',
      'Project-description',
      'Project-color',
      'Project-adminUserId',
      'User-name',
      'User-icon',
      'User-idpUserId',
    ];
    attributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request['Item'][attribute] = {
          S: item[attribute],
        };
      }
    });
    return request;
  });
  const params: DynamoDB.BatchWriteItemInput = {
    RequestItems: {
      Project_User: putRequests.map((putRequest) => ({
        PutRequest: putRequest,
      })),
    },
  };
  await dynamodb.batchWriteItem(params).promise();
};

const importBoardSampleData = async () => {
  const putRequests: PutRequest[] = boardItems.map((item) => {
    const request: PutRequest = {
      Item: {
        id: {
          S: item.id,
        },
        name: {
          S: item.name,
        },
        projectId: {
          S: item.projectId,
        },
      },
    };
    if (item.description != null) {
      request.Item.description = {
        S: item.description,
      };
    }
    if (item.tasksOrder.length > 0) {
      request.Item.tasksOrder = {
        L: item.tasksOrder.map((taskOrderItem) => ({
          M: {
            type: {
              S: taskOrderItem.type,
            },
            taskId: {
              S: taskOrderItem.taskId,
            },
          },
        })),
      };
    }
    return request;
  });
  const params: DynamoDB.BatchWriteItemInput = {
    RequestItems: {
      Board: putRequests.map((putRequest) => ({
        PutRequest: putRequest,
      })),
    },
  };
  await dynamodb.batchWriteItem(params).promise();
};

const importTaskGroupSampleData = async () => {
  const putRequests: PutRequest[] = taskGroupItems.map((item) => {
    const request: PutRequest = {
      Item: {
        id: {
          S: item.id,
        },
        title: {
          S: item.title,
        },
        status: {
          S: item.status,
        },
        boardId: {
          S: item.boardId,
        },
        createdAt: {
          N: String(item.createdAt),
        },
      },
    };
    const stringAttributes = ['description', 'assignUserId'];
    const numberAttributes = ['scheduledTimeSec'];
    const stringSetAttributes = ['tasksOrder'];
    stringAttributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request.Item[attribute] = { S: item[attribute] };
      }
    });
    numberAttributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request.Item[attribute] = { N: String(item[attribute]) };
      }
    });
    stringSetAttributes.forEach((attribute) => {
      if ((item[attribute]?.length ?? 0) > 0) {
        request.Item[attribute] = { SS: item[attribute] };
      }
    });
    return request;
  });
  const params: DynamoDB.BatchWriteItemInput = {
    RequestItems: {
      TaskGroup: putRequests.map((putRequest) => ({
        PutRequest: putRequest,
      })),
    },
  };
  await dynamodb.batchWriteItem(params).promise();
};

const importTaskSampleData = async () => {
  const putRequests: PutRequest[] = taskItems.map((item) => {
    const request: PutRequest = {
      Item: {
        id: {
          S: item.id,
        },
        title: {
          S: item.title,
        },
        status: {
          S: item.status,
        },
        workTimeSec: {
          N: String(item.workTimeSec),
        },
        createdAt: {
          N: String(item.createdAt),
        },
      },
    };
    const stringAttributes = [
      'description',
      'assignUserId',
      'taskGroupId',
      'boardId',
    ];
    const numberAttributes = ['scheduledTimeSec', 'workStartDateTimestamp'];
    const stringSetAttributes = ['subtasksOrder'];
    stringAttributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request.Item[attribute] = { S: item[attribute] };
      }
    });
    numberAttributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request.Item[attribute] = { N: String(item[attribute]) };
      }
    });
    stringSetAttributes.forEach((attribute) => {
      if ((item[attribute]?.length ?? 0) > 0) {
        request.Item[attribute] = { SS: item[attribute] };
      }
    });
    return request;
  });
  const params: DynamoDB.BatchWriteItemInput = {
    RequestItems: {
      Task: putRequests.map((putRequest) => ({
        PutRequest: putRequest,
      })),
    },
  };
  await dynamodb.batchWriteItem(params).promise();
};

const importSubtaskSampleData = async () => {
  const putRequests: PutRequest[] = subtaskItems.map((item) => {
    const request: PutRequest = {
      Item: {
        id: {
          S: item.id,
        },
        title: {
          S: item.title,
        },
        isDone: {
          BOOL: item.isDone,
        },
        taskId: {
          S: item.taskId,
        },
        workTimeSec: {
          N: String(item.workTimeSec),
        },
        createdAt: {
          N: String(item.createdAt),
        },
      },
    };
    const stringAttributes = ['description', 'assignUserId'];
    const numberAttributes = ['scheduledTimeSec', 'workStartDateTimestamp'];
    stringAttributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request.Item[attribute] = { S: item[attribute] };
      }
    });
    numberAttributes.forEach((attribute) => {
      if (item[attribute] != null) {
        request.Item[attribute] = { N: String(item[attribute]) };
      }
    });
    return request;
  });
  const params: DynamoDB.BatchWriteItemInput = {
    RequestItems: {
      Subtask: putRequests.map((putRequest) => ({
        PutRequest: putRequest,
      })),
    },
  };
  await dynamodb.batchWriteItem(params).promise();
};

const main = async () => {
  try {
    await importProjectUserSampleData();
    console.log('[Info]: import Project_User');
    await importBoardSampleData();
    console.log('[Info]: import Board');
    await importTaskGroupSampleData();
    console.log('[Info]: import TaskGroup');
    await importTaskSampleData();
    console.log('[Info]: import Task');
    await importSubtaskSampleData();
    console.log('[Info]: import Subtask');
    console.log('[Info]: Completed');
  } catch (error) {
    console.error('[Error]: ', error);
  }
};

main();
