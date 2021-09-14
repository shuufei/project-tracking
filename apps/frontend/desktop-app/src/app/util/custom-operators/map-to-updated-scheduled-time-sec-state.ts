import { RxState } from '@rx-angular/state';
import { OperatorFunction, pipe } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { nonNullable } from './non-nullable';

type Key = 'task' | 'subtask' | 'taskGroup';

export const mapToUpdatedScheduledTimeSecState = <
  T extends {
    scheduledTimeSec?: number;
  }
>(
  state: RxState<
    {
      [key in Key]?: T;
    }
  >,
  key: Key
): OperatorFunction<number, { updated: T; current: T }> => {
  return pipe(
    filter((sec) => {
      return sec !== (state.get(key)?.scheduledTimeSec ?? 0);
    }),
    withLatestFrom(state.select(key).pipe(nonNullable())),
    map(([sec, currentKeyObj]) => {
      return {
        updated: { ...currentKeyObj, scheduledTimeSec: sec },
        current: currentKeyObj,
      };
    }),
    tap(({ updated }) => {
      state.set(key, () => updated);
    })
  );
};
