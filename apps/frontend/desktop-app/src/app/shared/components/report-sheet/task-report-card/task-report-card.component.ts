import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Task } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

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

  /**
   * State
   */
  readonly state$ = this.state.select();

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
