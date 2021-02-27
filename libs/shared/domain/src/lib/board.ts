import { Project } from './project';
import { Task } from './task';

export type Board = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  isArchived: boolean;
  project: Project;
};
