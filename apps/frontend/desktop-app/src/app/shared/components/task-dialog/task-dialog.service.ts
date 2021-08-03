import { Inject, Injectable, InjectionToken } from '@angular/core';
import { RxState } from '@rx-angular/state';

export type TaskDialogServiceState = {
  // task?: Task;
  // taskGroup?: TaskGroup;
  // subtask?: Subtask;
  isOpened: boolean;
};

@Injectable()
export class TaskDialogService {
  readonly state$ = this.state.select();
  readonly isOpened$ = this.state.select('isOpened');

  constructor(
    @Inject(TASK_DIALOG_SERVICE_STATE)
    private readonly state: RxState<TaskDialogServiceState>
  ) {}

  open() {
    this.state.set('isOpened', () => true);
  }

  close() {
    this.state.set('isOpened', () => false);
  }
}

export const TASK_DIALOG_SERVICE_STATE = new InjectionToken<
  RxState<TaskDialogServiceState>
>('TaskDialogServiceState');
