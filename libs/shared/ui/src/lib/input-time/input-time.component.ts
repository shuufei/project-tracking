import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'ui-input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class InputTimeComponent {
  @Input()
  set hours(value: number) {
    if (value === Number(this.time.value.hours) && value !== 0) {
      return;
    }
    this.time.controls.hours.setValue(
      this.isOneDigit(value) ? `0${value}` : value
    );
  }
  @Input()
  set minutes(value: number) {
    if (value === Number(this.time.value.minutes) && value !== 0) {
      return;
    }
    this.time.controls.minutes.setValue(
      this.isOneDigit(value) ? `0${value}` : value
    );
  }
  @Input()
  set seconds(value: number) {
    if (value === Number(this.time.value.seconds) && value !== 0) {
      return;
    }
    this.time.controls.seconds.setValue(
      this.isOneDigit(value) ? `0${value}` : value
    );
  }
  @Output() changedTime = new EventEmitter<ChangedTimeEvent>();
  @ViewChild('hoursInput', { static: true }) hoursInput?: ElementRef;
  @ViewChild('minutesInput', { static: true }) minutesInput?: ElementRef;
  @ViewChild('secondsInput', { static: true }) secondsInput?: ElementRef;
  @ViewChild('resetButton', { static: true, read: ElementRef })
  resetButton?: ElementRef;

  // Events
  readonly inputedHoursValue$ = new Subject<InputEvent>();
  readonly inputedMinutesValue$ = new Subject<InputEvent>();
  readonly inputedSecondsValue$ = new Subject<InputEvent>();
  readonly resetTime$ = new Subject<void>();
  private readonly onClickedHostEl$ = new Subject<Event>();

  // State
  readonly time = new FormGroup<{
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
  }>({
    hours: new FormControl(),
    minutes: new FormControl(),
    seconds: new FormControl(),
  });
  private readonly formatedHours$ = this.inputedHoursValue$.pipe(
    map((event) => {
      const currentValue = this.time.value.hours;
      return this.formatValue(event.data, Number(currentValue), 99);
    })
  );
  private readonly formatedMinutes$ = this.inputedMinutesValue$.pipe(
    map((event) => {
      const currentValue = this.time.value.minutes;
      return this.formatValue(event.data, Number(currentValue), 59);
    })
  );
  private readonly formatedSeconds$ = this.inputedSecondsValue$.pipe(
    map((event) => {
      const currentValue = this.time.value.seconds;
      return this.formatValue(event.data, Number(currentValue), 59);
    })
  );

  // Event Handlers
  private readonly formatHoursValueHandler$ = this.formatedHours$.pipe(
    tap((value) => {
      this.time.controls.hours.setValue(value, {});
    })
  );

  private readonly formatMinutesValueHandler$ = this.formatedMinutes$.pipe(
    tap((value) => {
      this.time.controls.minutes.setValue(value, {});
    })
  );

  private readonly formatSecondsValueHandler$ = this.formatedSeconds$.pipe(
    tap((value) => {
      this.time.controls.seconds.setValue(value, {});
    })
  );

  private readonly resetTimeHandler$ = this.resetTime$.pipe(
    tap(() => {
      this.time.setValue({
        hours: this.getDefaultValue(),
        minutes: this.getDefaultValue(),
        seconds: this.getDefaultValue(),
      });
    })
  );

  private readonly focusHoursInputHandler$ = this.onClickedHostEl$.pipe(
    filter(
      (event) =>
        !(this.minutesInput?.nativeElement as HTMLElement)?.contains(
          event.target as Node
        ) &&
        !(this.resetButton?.nativeElement as HTMLElement)?.contains(
          event.target as Node
        ) &&
        !(this.secondsInput?.nativeElement as HTMLElement)?.contains(
          event.target as Node
        )
    ),
    tap(() => {
      (this.hoursInput?.nativeElement as HTMLInputElement)?.focus();
    })
  );

  private readonly emitTimeValueHandler$ = this.time.valueChanges.pipe(
    map(({ hours, minutes, seconds }) => [
      Number(hours),
      Number(minutes),
      Number(seconds),
    ]),
    filter(
      ([hours, minutes, seconds]) =>
        !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)
    ),
    distinctUntilChanged((prev, current) => {
      return (
        prev[0] === current[0] &&
        prev[1] === current[1] &&
        prev[2] === current[2]
      );
    }),
    debounceTime(0),
    tap(([hours, minutes, seconds]) => {
      this.changedTime.emit({
        hours,
        minutes,
        seconds,
      });
    })
  );

  private readonly emitResetTimeValueHandler$ = this.resetTime$.pipe(
    tap(() => {
      this.changedTime.emit({ hours: 0, minutes: 0, seconds: 0 });
    })
  );

  constructor(private state: RxState<{ [key: string]: never }>) {
    this.state.hold(this.formatHoursValueHandler$);
    this.state.hold(this.formatMinutesValueHandler$);
    this.state.hold(this.formatSecondsValueHandler$);
    this.state.hold(this.resetTimeHandler$);
    this.state.hold(this.focusHoursInputHandler$);
    this.state.hold(this.emitTimeValueHandler$);
    this.state.hold(this.emitResetTimeValueHandler$);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.onClickedHostEl$.next(event);
  }

  private isOneDigit(value: number) {
    return value >= 0 && value < 10;
  }

  private formatValue(
    inputedValue: string | null,
    value: number,
    maxValue: number
  ) {
    if (inputedValue != null && this.isOneDigit(value)) {
      return `0${value}`;
    } else if (value >= maxValue) {
      return `0${inputedValue}`;
    } else if (value < 0) {
      return '00';
    } else {
      return value;
    }
  }

  private getDefaultValue() {
    return '00';
  }
}

export type ChangedTimeEvent = {
  hours: number;
  minutes: number;
  seconds: number;
};
