import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import type { Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  status: Status;
};

@Component({
  selector: 'ui-status-change-button',
  templateUrl: './status-change-button.component.html',
  styleUrls: ['./status-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StatusChangeButtonComponent implements OnInit {
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

  ngOnInit() {
    this.state.connect('status', this.onChangedStatus$);
    this.state.hold(this.state.select('status'), (status) => {
      this.changedStatus.emit(status);
    });
  }
}
