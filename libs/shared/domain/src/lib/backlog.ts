import { Project } from './project';
import { Task } from './task';
import { createId } from './utils/create-id';

export type Backlog = {
  id: string;
  tasks: Task[];
  projectId: Project['id'];
};

export const createBacklog = (projectId: Backlog['projectId']): Backlog => ({
  id: createId(),
  tasks: [],
  projectId,
});
