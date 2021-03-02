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
import { convertToTimeFromSec } from '../convert-time';

type State = {
  hours: number;
  minutes: number;
  seconds: number;
};

@Component({
  selector: 'ui-planned-time-controller',
  templateUrl: './planned-time-controller.component.html',
  styleUrls: ['./planned-time-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class PlannedTimeControllerComponent {
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
  readonly onSetSec$ = new Subject<number>();

  // State
  readonly hours$ = this.state.select('hours');
  readonly minutes$ = this.state.select('minutes');
  readonly seconds$ = this.state.select('seconds');

  constructor(private state: RxState<State>) {
    this.state.connect(this.onSetSec$, (state, sec) => {
      const { hours, minutes, seconds } = convertToTimeFromSec(sec);
      return {
        ...state,
        hours,
        minutes,
        seconds,
      };
    });

    this.state.connect(
      this.onChangedInput$,
      (state, { hours, minutes, seconds }) => {
        return { ...state, hours, minutes, seconds };
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
  }
}
