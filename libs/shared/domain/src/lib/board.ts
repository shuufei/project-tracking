import { createId, Id } from './id';
import { Project } from './project';

export type Board = {
  id: Id;
  name: string;
  description?: string;
  projectId: Project['id'];
};

export const createBoard = (
  name: Board['name'],
  projectId: Board['projectId'],
  description?: Board['description']
): Board => ({
  id: createId(),
  name,
  description,
  projectId,
});
