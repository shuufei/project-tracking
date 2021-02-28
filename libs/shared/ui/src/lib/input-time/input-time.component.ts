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
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  tap,
  withLatestFrom,
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
    this.time.controls.hours.setValue(
      this.isOneDigit(value) ? `0${value}` : value,
      { emitEvent: false }
    );
  }
  @Input()
  set minutes(value: number) {
    this.time.controls.minutes.setValue(
      this.isOneDigit(value) ? `0${value}` : value,
      { emitEvent: false }
    );
  }
  @Input()
  set seconds(value: number) {
    this.time.controls.seconds.setValue(
      this.isOneDigit(value) ? `0${value}` : value,
      {
        emitEvent: false,
      }
    );
  }
  @Input()
  set isEnableZero(value: boolean) {
    this.isEnableZero$.next(value);
  }
  @Output() changedTime = new EventEmitter<ChangedTimeEvent>();
  @ViewChild('hoursInput', { static: true }) hoursInput: ElementRef;
  @ViewChild('minutesInput', { static: true }) minutesInput: ElementRef;
  @ViewChild('secondsInput', { static: true }) secondsInput: ElementRef;
  @ViewChild('resetButton', { static: true, read: ElementRef })
  resetButton: ElementRef;

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
    hours: new FormControl('00'),
    minutes: new FormControl('00'),
    seconds: new FormControl('00'),
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
  private readonly isEnableZero$ = new BehaviorSubject(true);

  // Event Handlers
  private readonly formatHoursValueHandler$ = this.formatedHours$.pipe(
    distinctUntilChanged((prev, current) => prev === current),
    tap((value) => {
      this.time.controls.hours.setValue(value, {
        emitEvent: false,
      });
    })
  );

  private readonly formatMinutesValueHandler$ = this.formatedMinutes$.pipe(
    distinctUntilChanged((prev, current) => prev === current),
    tap((value) => {
      this.time.controls.minutes.setValue(value, {
        emitEvent: false,
      });
    })
  );

  private readonly formatSecondsValueHandler$ = this.formatedSeconds$.pipe(
    distinctUntilChanged((prev, current) => prev === current),
    tap((value) => {
      this.time.controls.seconds.setValue(value, { emitEvent: false });
    })
  );

  private readonly resetTimeHandler$ = this.resetTime$.pipe(
    withLatestFrom(this.isEnableZero$),
    tap(([, isEnableZero]) => {
      this.time.setValue({
        hours: this.getDefaultValue(isEnableZero),
        minutes: this.getDefaultValue(isEnableZero),
        seconds: this.getDefaultValue(isEnableZero),
      });
    })
  );

  private readonly focusHoursInputHandler$ = this.onClickedHostEl$.pipe(
    filter(
      (event) =>
        !(this.minutesInput.nativeElement as HTMLElement).contains(
          event.target as Node
        ) &&
        !(this.resetButton.nativeElement as HTMLElement).contains(
          event.target as Node
        ) &&
        !(this.secondsInput.nativeElement as HTMLElement).contains(
          event.target as Node
        )
    ),
    tap(() => {
      (this.hoursInput.nativeElement as HTMLInputElement).focus();
    })
  );

  private readonly emitTimeValueHandler$ = combineLatest([
    this.formatedHours$.pipe(startWith(this.time.value.hours)),
    this.formatedMinutes$.pipe(startWith(this.time.value.minutes)),
    this.formatedSeconds$.pipe(startWith(this.time.value.seconds)),
  ]).pipe(
    map((value) => value.map((v) => Number(v)) as [number, number, number]),
    distinctUntilChanged((prev, current) => {
      return (
        prev[0] === current[0] &&
        prev[1] === current[1] &&
        prev[2] === current[2]
      );
    }),
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

  private readonly setDefaultValueHandler$ = this.isEnableZero$.pipe(
    tap((isEnableZero) => {
      this.time.setValue({
        hours: this.getDefaultValue(isEnableZero),
        minutes: this.getDefaultValue(isEnableZero),
        seconds: this.getDefaultValue(isEnableZero),
      });
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
    this.state.hold(this.setDefaultValueHandler$);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.onClickedHostEl$.next(event);
  }

  private isOneDigit(value: number) {
    return value > 0 && value < 10;
  }

  private formatValue(inputedValue: string, value: number, maxValue: number) {
    if (value >= maxValue) {
      return `0${inputedValue}`;
    } else if (value < 0) {
      return '00';
    } else {
      return value;
    }
  }

  private getDefaultValue(isEnableZero: boolean) {
    return isEnableZero ? '00' : '';
  }
}

export type ChangedTimeEvent = {
  hours: number;
  minutes: number;
  seconds: number;
};
