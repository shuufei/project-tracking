import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Subtask, Task } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';

type State = {
  task?: Task;
  isOpenedSubtasks: boolean;
};

@Component({
  selector: 'bis-task-report-card',
  templateUrl: './task-report-card.component.html',
  styleUrls: ['./task-report-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskReportCardComponent implements OnInit {
  @Input()
  set task(value: NonNullable<State['task']>) {
    this.state.set('task', () => value);
  }
  @Input() maxTimeSec?: number;

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly subtasks$ = this.state.select('task').pipe(
    nonNullable(),
    map((task) => {
      const orderItems = task.subtasksOrder
        .map((id) => task.subtasks.find((subtask) => subtask.id === id))
        .filter((v): v is Subtask => v != null);
      const remainedSubtasks = task.subtasks.filter(
        (subtask) => !orderItems.find((v) => v.id === subtask.id)
      );
      return [...orderItems, ...remainedSubtasks];
    })
  );

  /**
   * Event
   */
  readonly onClickedOpenSubtasks$ = new Subject<void>();
  readonly onClickedCloseSubtasks$ = new Subject<void>();

  constructor(private state: RxState<State>) {
    this.state.set({
      isOpenedSubtasks: false,
    });
  }

  ngOnInit(): void {
    this.state.connect(
      'isOpenedSubtasks',
      this.onClickedOpenSubtasks$,
      () => true
    );
    this.state.connect(
      'isOpenedSubtasks',
      this.onClickedCloseSubtasks$,
      () => false
    );
  }
}
