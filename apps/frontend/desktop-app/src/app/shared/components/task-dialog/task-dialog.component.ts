import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  isSubtask,
  isTask,
  isTaskGroup,
  Task,
  TaskGroup,
} from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { TaskDialogService } from './task-dialog.service';

type State = {
  isOpenDialog: boolean;
};

type ContentType = 'task' | 'taskGroup' | 'subtask' | 'none';

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
  readonly taskGroup$ = this.taskDialogService.currentContent$.pipe(
    filter((v): v is TaskGroup => {
      return isTaskGroup(v);
    })
  );
  readonly currentContentType$: Observable<ContentType> = this.taskDialogService.currentContent$.pipe(
    map((content) => {
      return isTask(content)
        ? 'task'
        : isTaskGroup(content)
        ? 'taskGroup'
        : isSubtask(content)
        ? 'subtask'
        : 'none';
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
    this.state.hold(
      this.onClosedDialog$.pipe(
        withLatestFrom(this.taskDialogService.isOpened$),
        filter(([, isOpened]) => isOpened)
      ),
      () => this.taskDialogService.close()
    );
  }
}
