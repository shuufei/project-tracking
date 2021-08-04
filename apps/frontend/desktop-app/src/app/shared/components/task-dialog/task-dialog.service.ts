import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Task } from '@bison/frontend/domain';
import { Subtask, TaskGroup } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';

export type TaskDialogServiceState = {
  isOpened: boolean;
  contentHistory: (Task | Subtask | TaskGroup)[]; // TODO: SubtaskとTaskGroupはコンポーネントで扱いやすいようにfrontend/domeinに別途型定義して利用する
};

@Injectable()
export class TaskDialogService {
  readonly state$ = this.state.select();
  readonly isOpened$ = this.state.select('isOpened');
  readonly contentHistory$ = this.state.select('contentHistory');

  constructor(
    @Inject(TASK_DIALOG_SERVICE_STATE)
    private readonly state: RxState<TaskDialogServiceState>
  ) {
    this.state.set({
      isOpened: false,
      contentHistory: [],
    });
  }

  open() {
    this.state.set('isOpened', () => true);
  }

  close() {
    this.state.set('isOpened', () => false);
  }

  pushContent(content: TaskDialogServiceState['contentHistory'][number]) {
    this.state.set('contentHistory', (state) => {
      return [...state.contentHistory, content];
    });
  }
}

export const TASK_DIALOG_SERVICE_STATE = new InjectionToken<
  RxState<TaskDialogServiceState>
>('TaskDialogServiceState');
