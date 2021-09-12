import { Subtask, Task } from '@bison/frontend/domain';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
export const sortSubtasks = (): OperatorFunction<Task, Subtask[]> => {
  return pipe(
    map((task) => {
      const subtasks = task.subtasksOrder
        .map((subtaskId) =>
          task.subtasks.find((subtask) => subtask.id === subtaskId)
        )
        .filter((v): v is NonNullable<typeof v> => v != null);
      const remainedSubtasks = task.subtasks
        .filter((subtask) => subtasks.find((v) => v.id === subtask.id) == null)
        .sort((v1, v2) => v1.createdAt - v2.createdAt);
      return [...subtasks, ...remainedSubtasks];
    })
  );
};
