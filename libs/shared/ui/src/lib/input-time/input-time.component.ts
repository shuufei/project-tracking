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
// import { FormGroup, FormControl } from '@angular/forms';

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
      value > 0 && value < 10 ? `0${value}` : value,
      { emitEvent: false }
    );
  }
  @Input()
  set minutes(value: number) {
    this.time.controls.minutes.setValue(
      value > 0 && value < 10 ? `0${value}` : value,
      { emitEvent: false }
    );
  }
  @ViewChild('hoursInput', { static: true }) hoursInput: ElementRef;
  @ViewChild('minutesInput', { static: true }) minutesInput: ElementRef;
  @ViewChild('resetButton', { static: true, read: ElementRef })
  resetButton: ElementRef;

  readonly time = new FormGroup<{
    hours: number | string;
    minutes: number | string;
  }>({
    hours: new FormControl('00'),
    minutes: new FormControl('00'),
  });

  readonly inputedHoursValue$ = new Subject<InputEvent>();
  readonly inputedMinutesValue$ = new Subject<InputEvent>();
  readonly resetTime$ = new Subject<void>();
  private readonly onClickedHostEl$ = new Subject<Event>();

  private readonly controlHoursValueHandler$ = this.inputedHoursValue$.pipe(
    tap((event) => {
      const currentValue = this.time.value.hours;
      if (currentValue >= 0 && currentValue <= 9) {
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

  private readonly controlMinutesValueHandler$ = this.inputedMinutesValue$.pipe(
    tap((event) => {
      const currentValue = this.time.value.minutes;
      if (currentValue >= 0 && currentValue <= 9) {
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

  private readonly resetTimeHandler$ = this.resetTime$.pipe(
    tap(() => {
      this.time.setValue({
        hours: '00',
        minutes: '00',
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
        )
    ),
    tap(() => {
      (this.hoursInput.nativeElement as HTMLInputElement).focus();
    })
  );

  constructor(private state: RxState<{ [key: string]: never }>) {
    this.state.hold(this.controlHoursValueHandler$);
    this.state.hold(this.controlMinutesValueHandler$);
    this.state.hold(this.resetTimeHandler$);
    this.state.hold(this.focusHoursInputHandler$);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.onClickedHostEl$.next(event);
  }
}
