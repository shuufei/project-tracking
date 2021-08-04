import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Task } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
  TaskDialogService,
  TaskDialogServiceState,
} from './task-dialog.service';

type State = {
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
  @Input() set task(value: Task) {
    this.taskDialogService.pushContent(value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenedDialog$ = this.taskDialogService.isOpened$;
  readonly task$ = this.taskDialogService.contentHistory$.pipe(
    map((contentHistory) => {
      const latestContents = contentHistory[contentHistory.length - 1];
      return latestContents;
    }),
    filter((latestContents): latestContents is Task => {
      return latestContents && this.isTask(latestContents);
    })
  );

  /**
   * Event
   */
  readonly onOpenedDialog$ = new Subject<void>();
  readonly onClosedDialog$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService
  ) {
    this.state.set({
      isOpenDialog: false,
    });
  }

  ngOnInit(): void {
    this.state.hold(this.onOpenedDialog$, () => this.taskDialogService.open());
    this.state.hold(this.onClosedDialog$, () => this.taskDialogService.close());
  }

  private isTask(
    value: TaskDialogServiceState['contentHistory'][number]
  ): value is Task {
    // TODO: Task判定実装
    return true;
  }
}
