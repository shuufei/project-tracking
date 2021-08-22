import { RxState } from '@rx-angular/state';
import { OperatorFunction, pipe } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { nonNullable } from '../non-nullable';

type Key = 'task' | 'subtask';

export const updateStateOnPlay = <
  T extends {
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
      return {
        updated: {
          ...currentKeyObj,
          workStartDateTimestamp: new Date().valueOf(),
        },
        current: currentKeyObj,
      };
    }),
    tap(({ updated }) => {
      state.set(key, () => updated);
    })
  );
};
