import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Subtask, Task, TaskGroup } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import {
  TaskDialogService,
  TaskDialogServiceState,
} from './task-dialog.service';

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
  readonly currentContent$ = this.taskDialogService.contentHistory$.pipe(
    map((contentHistory) => {
      const latestContent = contentHistory[contentHistory.length - 1];
      return latestContent;
    }),
    filter((v): v is NonNullable<typeof v> => {
      return v != null;
    })
  );
  readonly task$ = this.currentContent$.pipe(
    filter((latestContent): latestContent is Task => {
      return this.isTask(latestContent);
    })
  );
  readonly subtask$ = this.currentContent$.pipe(
    filter((v): v is Subtask => {
      return this.isSubtask(v);
    })
  );
  readonly taskGroup$ = this.currentContent$.pipe(
    filter((v): v is TaskGroup => {
      return this.isTaskGroup(v);
    })
  );
  readonly currentContentType$: Observable<ContentType> = this.currentContent$.pipe(
    map((content) => {
      return this.isTask(content)
        ? 'task'
        : this.isTaskGroup(content)
        ? 'taskGroup'
        : this.isSubtask(content)
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

  private isTask(
    value: TaskDialogServiceState['contentHistory'][number]
  ): value is Task {
    return (value as Task).subtasks != null;
  }

  private isTaskGroup(
    value: TaskDialogServiceState['contentHistory'][number]
  ): value is TaskGroup {
    return (
      (value as Task).subtasks == null &&
      (value as Task['subtasks'][number]).isDone == null
    );
  }

  private isSubtask(
    value: TaskDialogServiceState['contentHistory'][number]
  ): value is Subtask {
    return (value as Task['subtasks'][number]).isDone != null;
  }
}
