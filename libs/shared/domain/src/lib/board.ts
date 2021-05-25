import { createId, Id } from './id';
import { Project } from './project';

export type Board = {
  id: Id;
  name: string;
  description?: string;
  projectId: Project['id'];
  tasksOrder: BoardTasksOrderItem[];
};

export type BoardTasksOrderItem = {
  taskId: Id;
  type: BoardTaskType;
};

export type BoardTaskType = 'TaskGroup' | 'Task';

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
});
