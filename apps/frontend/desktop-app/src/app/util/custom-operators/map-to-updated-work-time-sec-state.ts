import { RxState } from '@rx-angular/state';
import { OperatorFunction, pipe } from 'rxjs';
import {
  filter,
  map,
  pairwise,
  startWith,
  withLatestFrom,
} from 'rxjs/operators';
import { nonNullable } from './non-nullable';

type Key = 'task' | 'subtask' | 'taskGroup';

export const mapToUpdatedWorkTimeSecState = <
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
): OperatorFunction<number, { updated: T; current: T }> => {
  return pipe(
    startWith(state.get(key)?.workTimeSec ?? 0),
    pairwise(),
    filter(([prev, sec]) => {
      const diff = sec - prev;
      const isChangedByCtrlBtn = diff > 1;
      const isTracking = state.get(key)?.workStartDateTimestamp != null;
      return isChangedByCtrlBtn || !isTracking;
    }),
    map(([, current]) => current),
    filter((sec) => {
      return sec !== state.get(key)?.workTimeSec;
    }),
    withLatestFrom(state.select(key).pipe(nonNullable())),
    map(([sec, currentKeyObj]) => {
      const workStartDateTimestamp =
        currentKeyObj.workStartDateTimestamp && new Date().valueOf();
      return {
        updated: { ...currentKeyObj, workTimeSec: sec, workStartDateTimestamp },
        current: currentKeyObj,
      };
    })
  );
};
