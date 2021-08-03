import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Task } from '@bison/frontend/domain';
import { Subtask, TaskGroup } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type State = {
  contentsHistory: (Task | Subtask | TaskGroup)[]; // TODO: SubtaskとTaskGroupはコンポーネントで扱いやすいようにfrontend/domeinに別途型定義して利用する
  isOpenDialog: boolean;
};

@Component({
  selector: 'bis-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() isOpen$ = new Subject<boolean>();
  @Input() set task(value: Task) {
    this.state.set('contentsHistory', (state) => [
      ...state.contentsHistory,
      value,
    ]);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenDialog$ = this.state.select('isOpenDialog');
  readonly task$ = this.state.select('contentsHistory').pipe(
    map((contentsHistory) => {
      const latestContents = contentsHistory[contentsHistory.length - 1];
      return latestContents;
    }),
    filter((latestContents): latestContents is Task => {
      return latestContents && this.isTask(latestContents);
    })
  );

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onOpenedDialog$ = new Subject<void>();
  readonly onClosedDialog$ = new Subject<void>();

  constructor(private state: RxState<State>) {
    this.state.set({
      isOpenDialog: false,
      contentsHistory: [],
    });
  }

  ngOnInit(): void {
    this.state.connect('isOpenDialog', this.onClickedCloseButton$, () => false);
    this.state.connect('isOpenDialog', this.onOpenedDialog$, () => true);
    this.state.connect('isOpenDialog', this.onClosedDialog$, () => false);
  }

  private isTask(value: State['contentsHistory'][number]): value is Task {
    // TODO: Task判定実装
    return true;
  }
}
