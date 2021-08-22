import { RxState } from '@rx-angular/state';
import { OperatorFunction, pipe } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { nonNullable } from '../non-nullable';

type Key = 'task' | 'subtask';

export const updateStateOnPause = <
  T extends {
    workTimeSec: number;
    workStartDateTimestamp?: number;
  }
>(
  state: RxState<
    {
      [key in Key]?: T;
    }
  >,
  key: Key
): OperatorFunction<void, { updated: T; current: T }> => {
  return pipe(
    withLatestFrom(state.select(key).pipe(nonNullable())),
    map(([, currentKeyObj]) => {
      const start = currentKeyObj.workStartDateTimestamp;
      const currentWorkTimeSec = currentKeyObj.workTimeSec;
      if (start == null || currentWorkTimeSec == null)
        return { updated: currentKeyObj, current: currentKeyObj };
      const now = new Date();
      const diffTimeMilliSec = now.valueOf() - start;
      const updatedWorkTimeSec =
        currentWorkTimeSec + Math.ceil(diffTimeMilliSec / 1000);
      return {
        updated: {
          ...currentKeyObj,
          workTimeSec: updatedWorkTimeSec,
          workStartDateTimestamp: undefined,
        },
        current: currentKeyObj,
      };
    }),
    tap(({ updated }) => {
      state.set(key, () => updated);
    })
  );
};
