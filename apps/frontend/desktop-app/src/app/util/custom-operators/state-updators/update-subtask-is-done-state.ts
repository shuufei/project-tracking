import { Subtask } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { OperatorFunction, pipe } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { nonNullable } from '../non-nullable';

export const updateSubtaskIsDoneState = (
  state: RxState<{
    subtask?: Subtask;
  }>
): OperatorFunction<boolean, { updated: Subtask; current: Subtask }> => {
  return pipe(
    distinctUntilChanged(),
    filter((isDone) => {
      return isDone !== state.get('subtask')?.isDone;
    }),
    withLatestFrom(state.select('subtask').pipe(nonNullable())),
    map(([isDone, currentKeyObj]) => {
      return {
        updated: { ...currentKeyObj, isDone },
        current: currentKeyObj,
      };
    }),
    tap(({ updated }) => {
      state.set('subtask', () => updated);
    })
  );
};
