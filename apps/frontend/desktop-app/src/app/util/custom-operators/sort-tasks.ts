import { Task, TaskGroup } from '@bison/frontend/domain';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const sortTasks = (): OperatorFunction<TaskGroup, Task[]> => {
  return pipe(
    map((taskGroup) => {
      const tasks = taskGroup.tasksOrder
        .map((taskId) => taskGroup.tasks.find((task) => task.id === taskId))
        .filter((v): v is NonNullable<typeof v> => v != null);
      const remainedTasks = taskGroup.tasks
        .filter((task) => tasks.find((v) => v.id === task.id) == null)
        .sort((v1, v2) => v1.createdAt - v2.createdAt);
      return [...tasks, ...remainedTasks];
    })
  );
};
