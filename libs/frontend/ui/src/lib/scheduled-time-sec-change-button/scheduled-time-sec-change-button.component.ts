import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangedTimeEvent } from '../input-time/input-time.component';
import {
  convertToSecFromTime,
  convertToTimeFromSec,
} from '../utils/convert-time';

type State = {
  workTimeSec: number;
  scheduledTimeSec: number;
};

@Component({
  selector: 'ui-scheduled-time-sec-change-button',
  templateUrl: './scheduled-time-sec-change-button.component.html',
  styleUrls: ['./scheduled-time-sec-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ScheduledTimeSecChangeButtonComponent implements OnInit {
  @Input()
  set workTimeSec(value: number) {
    this.state.set('workTimeSec', () => value);
  }
  @Input()
  set scheduledTimeSec(value: number) {
    this.state.set('scheduledTimeSec', () => value);
  }
  @Output() changedScheduledTimeSec = new EventEmitter<number>();

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly scheduledTime$ = this.state
    .select('scheduledTimeSec')
    .pipe(map((sec) => convertToTimeFromSec(sec)));

  /**
   * Event
   */
  private readonly onChangedScheduledTime$ = new Subject<ChangedTimeEvent>();

  constructor(private state: RxState<State>) {
    this.state.set({
      workTimeSec: 0,
      scheduledTimeSec: 0,
    });
  }

  ngOnInit() {
    this.state.connect(
      'scheduledTimeSec',
      this.onChangedScheduledTime$,
      (_, time) => convertToSecFromTime(time.hours, time.minutes, time.seconds)
    );
    this.state.hold(this.state.select('scheduledTimeSec'), (sec) => {
      this.changedScheduledTimeSec.emit(sec);
    });
  }
}
