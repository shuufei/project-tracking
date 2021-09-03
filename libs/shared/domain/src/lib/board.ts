import { createId, Id } from './id';
import { Project } from './project';
import { getNow } from './utils/get-now';

export type Board = {
  id: Id;
  name: string;
  description?: string;
  projectId: Project['id'];
  tasksOrder: BoardTasksOrderItem[];
  createdAt: number;
};

export type BoardTasksOrderItem = {
  taskId: Id;
  type: BoardTaskType;
};

export type BoardTaskType = 'TaskGroup' | 'Task';

export type BoardWithoutCreatedAt = Pick<
  Board,
  'id' | 'name' | 'description' | 'projectId' | 'tasksOrder'
>;

export const createBoard = (
  name: Board['name'],
  projectId: Board['projectId'],
  description?: Board['description']
): Board => ({
  id: createId(),
  name,
  description,
  projectId,
  tasksOrder: [],
  createdAt: getNow().valueOf(),
});
