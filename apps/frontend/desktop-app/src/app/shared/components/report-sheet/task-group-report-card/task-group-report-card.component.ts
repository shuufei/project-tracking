import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Task, TaskGroup } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';

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
  @Input() maxTimeSec?: number;

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly tasks$ = this.state.select('taskGroup').pipe(
    nonNullable(),
    map((taskGroup) => {
      const orderItems = taskGroup.tasksOrder
        .map((id) => taskGroup.tasks.find((task) => task.id === id))
        .filter((v): v is Task => v != null);
      const remainedTasks = taskGroup.tasks.filter(
        (task) => !orderItems.find((v) => v.id === task.id)
      );
      return [...orderItems, ...remainedTasks];
    })
  );

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    return;
  }
}
