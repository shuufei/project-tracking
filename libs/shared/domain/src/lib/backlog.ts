import { Project } from './project';
import { Task } from './task';

export type Backlog = {
  id: string;
  tasks: Task[];
  project: Project;
};
