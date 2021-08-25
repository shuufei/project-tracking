import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TaskGroup } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';

type State = {
  taskGroup?: TaskGroup;
  workTimeSec: number;
};

@Component({
  selector: 'bis-task-group-report-card',
  templateUrl: './task-group-report-card.component.html',
  styleUrls: ['./task-group-report-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskGroupReportCardComponent implements OnInit {
  @Input()
  set taskGroup(value: NonNullable<State['taskGroup']>) {
    this.state.set('taskGroup', () => value);
    const workTimeSec = value.tasks.reduce(
      (acc, curr) => acc + curr.workTimeSec,
      0
    );
    this.state.set('workTimeSec', () => workTimeSec);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    return;
  }
}
