import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { ChangedTimeEvent } from '../input-time/input-time.component';
import { Status } from '../time-label/time-label.component';
import {
  convertToSecFromTime,
  convertToTimeFromSec,
} from '../utils/convert-time';

type State = {
  title: string;
  done: boolean;
  selfTrackingTimeSec?: number;
  otherTrackingTimeSec?: number;
  selfPlannedTimeSec?: number;
  isTracking: boolean;
  isEditing: boolean;
};

@Component({
  selector: 'ui-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SubtaskComponent implements OnInit {
  @Input()
  set title(value: string) {
    this.state.set('title', () => value);
  }
  @Input()
  set done(value: boolean) {
    this.state.set('done', () => value);
  }
  @Input()
  set selfTrackingTimeSec(value: number | undefined) {
    this.state.set('selfTrackingTimeSec', () => value);
  }
  @Input()
  set otherTrackingTimeSec(value: number | undefined) {
    this.state.set('otherTrackingTimeSec', () => value);
  }
  @Input()
  set selfPlannedTimeSec(value: number | undefined) {
    this.state.set('selfPlannedTimeSec', () => value);
  }
  @Input()
  set isTracking(value: boolean) {
    this.state.set('isTracking', () => value);
  }
  @Input()
  set isEditing(value: boolean) {
    this.state.set('isEditing', () => value);
  }
  @Output() changedTitle = new EventEmitter<string>();
  @Output() changedDone = new EventEmitter<boolean>();
  @Output() clickedPlay = new EventEmitter<void>();
  @Output() clickedPause = new EventEmitter<void>();
  @Output() changedTrackingTimeSec = new EventEmitter<number>();
  @Output() changedPlannedTimeSec = new EventEmitter<number>();

  // State
  readonly state$ = this.state.select();
  readonly trackingTimeSec$: Observable<number | undefined> = combineLatest([
    this.state.select('selfTrackingTimeSec').pipe(startWith(undefined)),
    this.state.select('otherTrackingTimeSec').pipe(startWith(undefined)),
  ]).pipe(map(([self, other]) => (self !== undefined ? self : other)));
  readonly timeLabelStatus$: Observable<Status> = combineLatest([
    this.state.select('isTracking'),
    this.state.select('selfTrackingTimeSec').pipe(startWith(undefined)),
    this.state.select('otherTrackingTimeSec').pipe(startWith(undefined)),
  ]).pipe(
    map(([isTracking, selfTrackingTimeSec]) => {
      return isTracking
        ? 'tracking'
        : selfTrackingTimeSec !== undefined
        ? 'editable'
        : 'readonly';
    })
  );
  readonly selfTrackingTime$ = this.state.select('selfTrackingTimeSec').pipe(
    filter((v): v is number => v !== undefined),
    map((sec) => convertToTimeFromSec(sec))
  );
  readonly selfPlannedTime$ = this.state.select('selfPlannedTimeSec').pipe(
    filter((v): v is number => v !== undefined),
    map((sec) => convertToTimeFromSec(sec))
  );

  // Events
  readonly onChangedChecked$ = new Subject<boolean>();
  readonly onChangedSelfTrackingTime$ = new Subject<ChangedTimeEvent>();
  readonly onChangedSelfPlannedTime$ = new Subject<ChangedTimeEvent>();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();

  constructor(private state: RxState<State>) {
    this.state.set({
      title: '',
      done: false,
      isTracking: false,
      isEditing: false,
    });
  }

  ngOnInit() {
    this.state.connect('done', this.onChangedChecked$);
    this.state.connect(
      'selfTrackingTimeSec',
      this.onChangedSelfTrackingTime$,
      (_, time) => convertToSecFromTime(time.hours, time.minutes, time.seconds)
    );
    this.state.connect(
      'selfPlannedTimeSec',
      this.onChangedSelfPlannedTime$,
      (_, time) => convertToSecFromTime(time.hours, time.minutes, time.seconds)
    );
    this.state.hold(this.onClickedPlay$, () => {
      this.clickedPlay.emit();
    });
    this.state.hold(this.onClickedPause$, () => {
      this.clickedPause.emit();
    });
    this.state.hold(this.state.select('done'), (done) => {
      this.changedDone.emit(done);
    });
    this.state.hold(this.state.select('selfTrackingTimeSec'), (sec) => {
      this.changedTrackingTimeSec.emit(sec);
    });
    this.state.hold(this.state.select('selfPlannedTimeSec'), (sec) => {
      this.changedPlannedTimeSec.emit(sec);
    });
  }
}
