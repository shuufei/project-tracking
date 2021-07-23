import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  status: Status;
};

@Component({
  selector: 'bis-task-dialog-status-change-button',
  templateUrl: './task-dialog-status-change-button.component.html',
  styleUrls: ['./task-dialog-status-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogStatusChangeButtonComponent implements OnInit {
  @Input()
  set status(value: Status) {
    this.state.set('status', () => value);
  }
  @Output() changedStatus = new EventEmitter<Status>();

  readonly state$ = this.state.select();
  readonly onChangedStatus$ = new Subject<Status>();

  constructor(private state: RxState<State>) {
    this.state.set({
      status: 'TODO',
    });
  }

  ngOnInit(): void {
    this.state.connect('status', this.onChangedStatus$);
    this.state.hold(this.state.select('status'), (status) => {
      this.changedStatus.emit(status);
    });
  }
}
