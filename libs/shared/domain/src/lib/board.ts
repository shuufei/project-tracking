import { Project } from './project';
import { Task } from './task';
import { createId } from './utils/create-id';

export type Board = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  projectId: Project['id'];
};

export const createBoard = (
  name: Board['name'],
  projectId: Board['projectId'],
  tasks: Board['tasks'] = [],
  description?: Board['description']
): Board => ({
  id: createId(),
  name,
  description,
  tasks,
  projectId,
});
