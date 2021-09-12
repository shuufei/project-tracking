import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import { DialogContent, TaskDialogService } from './task-dialog.service';

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
  @Input() set dialogContent(value: DialogContent) {
    this.taskDialogService.pushContent(value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenedDialog$ = this.taskDialogService.isOpened$;
  readonly currentContentType$ = this.taskDialogService.currentContentType$;

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
    this.state.hold(
      this.onClosedDialog$.pipe(
        withLatestFrom(this.taskDialogService.isOpened$),
        filter(([, isOpened]) => isOpened)
      ),
      () => this.taskDialogService.close()
    );
  }
}
