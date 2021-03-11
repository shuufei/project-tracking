import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { convertToTimeFromSec } from '../utils/convert-time';

type State = {
  status: Status;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  isShowSec: boolean;
};

@Component({
  selector: 'ui-time-label',
  templateUrl: './time-label.component.html',
  styleUrls: ['./time-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TimeLabelComponent {
  @Input()
  set status(value: Status) {
    this.state.set('status', () => value);
  }
  @Input()
  set sec(value: number) {
    this.onChangedSec$.next(value);
  }
  @Input()
  set isShowSec(value: boolean) {
    this.state.set('isShowSec', () => value);
  }

  // State
  readonly status$ = this.state.select('status');
  readonly hours$ = this.state.select('time', 'hours');
  readonly minutes$ = this.state.select('time', 'minutes');
  readonly seconds$ = this.state.select('time', 'seconds');
  readonly isShowSec$ = this.state.select('isShowSec');

  // Events
  private readonly onChangedSec$ = new Subject<number>();

  constructor(private state: RxState<State>) {
    this.state.connect('time', this.onChangedSec$, (_, sec) =>
      convertToTimeFromSec(sec)
    );
    this.state.set({
      status: 'editable',
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      isShowSec: false,
    });
  }
}

export type Status = 'editable' | 'tracking' | 'readonly';
