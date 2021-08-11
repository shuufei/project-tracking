import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subtask, Task, TaskGroup } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

export type TaskDialogServiceState = {
  isOpened: boolean;
  contentHistory: (Task | Subtask | TaskGroup)[];
};

@Injectable()
export class TaskDialogService {
  readonly state$ = this.state.select();
  readonly isOpened$ = this.state.select('isOpened');
  readonly contentHistory$ = this.state.select('contentHistory');
  readonly existsPrevContent$ = this.contentHistory$.pipe(
    map((history) => history.length >= 2)
  );

  constructor(
    @Inject(TASK_DIALOG_SERVICE_STATE)
    private readonly state: RxState<TaskDialogServiceState>
  ) {
    this.resetState();
  }

  open() {
    this.state.set('isOpened', () => true);
  }

  close() {
    this.resetState();
  }

  pushContent(content: TaskDialogServiceState['contentHistory'][number]) {
    this.state.set('contentHistory', (state) => {
      return [...state.contentHistory, content];
    });
  }

  back() {
    if (this.state.get('contentHistory').length < 2) {
      return;
    }
    this.state.set('contentHistory', (state) => {
      const history = [...state.contentHistory];
      history.pop();
      return history;
    });
  }

  private resetState() {
    this.state.set({
      isOpened: false,
      contentHistory: [],
    });
  }
}

export const TASK_DIALOG_SERVICE_STATE = new InjectionToken<
  RxState<TaskDialogServiceState>
>('TaskDialogServiceState');
