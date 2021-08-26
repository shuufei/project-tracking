import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  convertToSecFromTime,
  convertToTimeFromSec,
  Time,
  User,
} from '@bison/frontend/ui';
import { Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

type State = {
  title: string;
  user?: User;
  workTime: Time;
  scheduledTime: Time;
  status: Status;
  maxTimeSec: number;
};

const MAX_TIME_SEC = 60 * 60 * 6;

@Component({
  selector: 'bis-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskReportComponent implements OnInit, AfterViewInit {
  @Input()
  set title(value: State['title']) {
    this.state.set('title', () => value);
  }
  @Input()
  set user(value: State['user']) {
    this.state.set('user', () => value);
  }
  @Input()
  set workTimeSec(value: number) {
    this.state.set('workTime', () => convertToTimeFromSec(value));
  }
  @Input()
  set scheduledTimeSec(value: number) {
    this.state.set('scheduledTime', () => convertToTimeFromSec(value));
  }
  @Input()
  set status(value: State['status']) {
    this.state.set('status', () => value);
  }
  @Input()
  set maxTimeSec(value: State['maxTimeSec'] | undefined) {
    this.state.set('maxTimeSec', () => value ?? MAX_TIME_SEC);
  }
  @ViewChild('workTimeBar') workTimeBar?: ElementRef;
  @ViewChild('scheduledTimeBar') scheduledTimeBar?: ElementRef;

  /**
   * State
   */
  readonly state$ = this.state.select();

  readonly afterViewInit$ = new Subject<void>();

  constructor(private state: RxState<State>) {
    this.state.set({
      title: '',
      workTime: convertToTimeFromSec(0),
      scheduledTime: convertToTimeFromSec(0),
      status: 'TODO',
      maxTimeSec: MAX_TIME_SEC,
    });
  }

  ngOnInit(): void {
    this.state.hold(
      this.afterViewInit$.pipe(
        switchMap(() => {
          return this.state.select('workTime');
        }),
        tap((workTime) => {
          const workTimeSec = convertToSecFromTime(
            workTime.hours,
            workTime.minutes,
            workTime.seconds
          );
          const maxTimeSec = this.state.get('maxTimeSec');
          const scheduledTime = this.state.get('scheduledTime');
          const scheduledTimeSec = convertToSecFromTime(
            scheduledTime.hours,
            scheduledTime.minutes,
            scheduledTime.seconds
          );
          const max =
            maxTimeSec < workTimeSec
              ? workTimeSec < scheduledTimeSec
                ? scheduledTimeSec
                : workTimeSec
              : maxTimeSec < scheduledTimeSec
              ? scheduledTimeSec
              : maxTimeSec;
          const ratio = (workTimeSec / max) * 100;
          (this.workTimeBar
            ?.nativeElement as HTMLElement).style.width = `${ratio}%`;
        })
      )
    );
    this.state.hold(
      this.afterViewInit$.pipe(
        switchMap(() => {
          return this.state.select('scheduledTime');
        }),
        tap((scheduledTime) => {
          const scheduledTimeSec = convertToSecFromTime(
            scheduledTime.hours,
            scheduledTime.minutes,
            scheduledTime.seconds
          );
          const maxTimeSec = this.state.get('maxTimeSec');
          const workTime = this.state.get('workTime');
          const workTimeSec = convertToSecFromTime(
            workTime.hours,
            workTime.minutes,
            workTime.seconds
          );
          const max =
            maxTimeSec < workTimeSec
              ? workTimeSec < scheduledTimeSec
                ? scheduledTimeSec
                : workTimeSec
              : maxTimeSec < scheduledTimeSec
              ? scheduledTimeSec
              : maxTimeSec;
          const ratio = (scheduledTimeSec / max) * 100;
          (this.scheduledTimeBar
            ?.nativeElement as HTMLElement).style.width = `${ratio}%`;
        })
      )
    );
  }

  ngAfterViewInit() {
    this.afterViewInit$.next();
  }
}
