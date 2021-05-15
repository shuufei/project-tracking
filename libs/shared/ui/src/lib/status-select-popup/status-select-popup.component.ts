import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import type { Status } from '@bison/shared/domain';
import { STATUS } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  currentStatus?: Status;
};

@Component({
  selector: 'ui-status-select-popup',
  templateUrl: './status-select-popup.component.html',
  styleUrls: ['./status-select-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StatusSelectPopupComponent {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set currentStatus(value: Status) {
    this.state.set({ currentStatus: value });
  }
  @Output() changedStatus = new EventEmitter<Status>();

  readonly currentStatus$ = this.state.select('currentStatus');

  readonly onClickedStatus$ = new Subject<Status>();

  readonly statusList = Object.values(STATUS);

  constructor(private state: RxState<State>) {
    this.state.connect('currentStatus', this.onClickedStatus$);
    this.state.hold(this.onClickedStatus$, (status) =>
      this.changedStatus.emit(status)
    );
  }
}
