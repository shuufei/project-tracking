import { Board as DomainBoard } from '@bison/shared/domain';
import { Task } from '../task';
import { TaskGroup } from '../taskGroup';

export type Board = DomainBoard & {
  soloTasks: Task[];
  taskGroups: TaskGroup[];
};
