import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
  @ViewChild('hoursInput', { static: true }) hoursInput: ElementRef;
  @ViewChild('minutesInput', { static: true }) minutesInput: ElementRef;
  @ViewChild('secondsInput', { static: true }) secondsInput: ElementRef;
  @ViewChild('resetButton', { static: true, read: ElementRef })
  resetButton: ElementRef;

  readonly time = new FormGroup<{
    hours: number | string;
    minutes: number | string;
    seconds: number | string;
  }>({
    hours: new FormControl('00'),
    minutes: new FormControl('00'),
    seconds: new FormControl('00'),
  });

  readonly inputedHoursValue$ = new Subject<InputEvent>();
  readonly inputedMinutesValue$ = new Subject<InputEvent>();
  readonly inputedSecondsValue$ = new Subject<InputEvent>();
  readonly resetTime$ = new Subject<void>();
  private readonly onClickedHostEl$ = new Subject<Event>();

  private readonly formatHoursValueHandler$ = this.inputedHoursValue$.pipe(
    tap((event) => {
      const currentValue = this.time.value.hours;
      if (this.isOneDigit(currentValue)) {
        this.time.controls.hours.setValue(`0${currentValue}`, {
          emitEvent: false,
        });
      } else if (currentValue > 99) {
        this.time.controls.hours.setValue(`0${event.data}`, {
          emitEvent: false,
        });
      } else if (currentValue < 0) {
        this.time.controls.hours.setValue('00', {
          emitEvent: false,
        });
      } else {
        this.time.controls.hours.setValue(currentValue, {
          emitEvent: false,
        });
      }
    })
  );

  private readonly formatMinutesValueHandler$ = this.inputedMinutesValue$.pipe(
    tap((event) => {
      const currentValue = this.time.value.minutes;
      if (this.isOneDigit(currentValue)) {
        this.time.controls.minutes.setValue(`0${currentValue}`, {
          emitEvent: false,
        });
      } else if (currentValue > 60) {
        this.time.controls.minutes.setValue(`0${event.data}`, {
          emitEvent: false,
        });
      } else if (currentValue < 0) {
        this.time.controls.minutes.setValue('00', {
          emitEvent: false,
        });
      } else {
        this.time.controls.minutes.setValue(currentValue, {
          emitEvent: false,
        });
      }
    })
  );

  private readonly formatSecondsValueHandler$ = this.inputedSecondsValue$.pipe(
    tap((event) => {
      const currentValue = this.time.value.seconds;
      if (this.isOneDigit(currentValue)) {
        this.time.controls.seconds.setValue(`0${currentValue}`, {
          emitEvent: false,
        });
      } else if (currentValue > 60) {
        this.time.controls.seconds.setValue(`0${event.data}`, {
          emitEvent: false,
        });
      } else if (currentValue < 0) {
        this.time.controls.seconds.setValue('00', {
          emitEvent: false,
        });
      } else {
        this.time.controls.seconds.setValue(currentValue, {
          emitEvent: false,
        });
      }
    })
  );

  private readonly resetTimeHandler$ = this.resetTime$.pipe(
    tap(() => {
      this.time.setValue({
        hours: '00',
        minutes: '00',
        seconds: '00',
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

  constructor(private state: RxState<{ [key: string]: never }>) {
    this.state.hold(this.formatHoursValueHandler$);
    this.state.hold(this.formatMinutesValueHandler$);
    this.state.hold(this.resetTimeHandler$);
    this.state.hold(this.focusHoursInputHandler$);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.onClickedHostEl$.next(event);
  }

  private isOneDigit(value) {
    return value > 0 && value < 10;
  }
}
