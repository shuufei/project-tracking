import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { ChangedTimeEvent } from '../../input-time/input-time.component';

type State = {
  hours: number;
  minutes: number;
  seconds: number;
};

@Component({
  selector: 'ui-tracking-time-controller',
  templateUrl: './tracking-time-controller.component.html',
  styleUrls: ['./tracking-time-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TrackingTimeControllerComponent {
  @Input()
  set hours(value: number) {
    this.state.set('hours', () => value);
  }
  @Input()
  set minutes(value: number) {
    this.state.set('minutes', () => value);
  }
  @Input()
  set seconds(value: number) {
    this.state.set('seconds', () => value);
  }
  @Output() changedTime = new EventEmitter<ChangedTimeEvent>();

  // Events
  readonly onChangedInput$ = new Subject<ChangedTimeEvent>();
  readonly onAddSec$ = new Subject<number>();
  readonly onSubstractSec$ = new Subject<number>();

  // State
  readonly hours$ = this.state.select('hours');
  readonly minutes$ = this.state.select('minutes');
  readonly seconds$ = this.state.select('seconds');

  constructor(private state: RxState<State>) {
    this.state.connect(this.onAddSec$, (state, sec) => {
      const currentSec = this.convertToSecFromTime(
        state.hours,
        state.minutes,
        state.seconds
      );
      const { hours, minutes, seconds } = this.convertToTimeFromSec(
        currentSec + sec
      );
      return {
        hours,
        minutes,
        seconds,
      };
    });

    this.state.connect(this.onSubstractSec$, (state, sec) => {
      const currentSec = this.convertToSecFromTime(
        state.hours,
        state.minutes,
        state.seconds
      );
      const { hours, minutes, seconds } = this.convertToTimeFromSec(
        currentSec - sec
      );
      return {
        ...state,
        hours: hours >= 0 ? hours : 0,
        minutes: minutes >= 0 ? minutes : 0,
        seconds: seconds >= 0 ? seconds : 0,
      };
    });

    this.state.connect(
      this.onChangedInput$,
      (state, { hours, minutes, seconds }) => {
        return {
          ...state,
          hours,
          minutes,
          seconds,
        };
      }
    );

    this.state.hold(
      this.state.$.pipe(
        distinctUntilChanged(
          (prev, current) =>
            prev.hours === current.hours &&
            prev.minutes === current.minutes &&
            prev.seconds === current.seconds
        )
      ),
      (state) => {
        this.changedTime.emit(state);
      }
    );

    this.state.set({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }

  private convertToSecFromTime(
    hours: number,
    minutes: number,
    seconds: number
  ) {
    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  private convertToTimeFromSec(
    sec: number
  ): { hours: number; minutes: number; seconds: number } {
    const hours = Math.trunc(sec / (60 * 60));
    const minutes = Math.trunc((sec - hours * 60 * 60) / 60);
    const seconds = sec - hours * 60 * 60 - minutes * 60;
    return {
      hours,
      minutes,
      seconds,
    };
  }
}
