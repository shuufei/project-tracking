import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import {
  combineLatest,
  EMPTY,
  fromEvent,
  merge,
  Observable,
  Subject,
} from 'rxjs';
import { filter, map, mapTo, startWith, switchMap } from 'rxjs/operators';
import { ChangedTimeEvent } from '../input-time/input-time.component';
import { Status } from '../time-label/time-label.component';
import {
  convertToSecFromTime,
  convertToTimeFromSec,
} from '../utils/convert-time';

const COMPOSITION_START = 'start' as const;
const COMPOSITION_END = 'end' as const;
type CompositionStatus = typeof COMPOSITION_START | typeof COMPOSITION_END;

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
export class SubtaskComponent implements OnInit, AfterViewInit {
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
    // TODO: 編集モードとそれ以外の状態とでコンポーネントを分割したい
    this.state.set('isEditing', () => value);
  }
  @Output() changedTitle = new EventEmitter<string>();
  @Output() changedDone = new EventEmitter<boolean>();
  @Output() clickedPlay = new EventEmitter<void>();
  @Output() clickedPause = new EventEmitter<void>();
  @Output() changedTrackingTimeSec = new EventEmitter<number>();
  @Output() changedPlannedTimeSec = new EventEmitter<number>();
  @ViewChild('titleField', { read: ElementRef }) titleField?: ElementRef;

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
  readonly onChangedTitle$ = new Subject<State['title']>();

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
    this.state.connect('title', this.onChangedTitle$);
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

  ngAfterViewInit() {
    this.setEmitChangedTitleHandler();
  }

  private setEmitChangedTitleHandler() {
    if (this.titleField === undefined) {
      return;
    }
    // テキスト変換中ステータス
    const compositionStatus$: Observable<CompositionStatus> = merge(
      fromEvent(this.titleField.nativeElement, 'compositionstart').pipe(
        mapTo(COMPOSITION_START)
      ),
      fromEvent(this.titleField.nativeElement, 'compositionend').pipe(
        mapTo(COMPOSITION_END)
      )
    ).pipe(startWith(COMPOSITION_END));
    // Enterキー押下イベント
    const onEnter$ = fromEvent<KeyboardEvent>(
      this.titleField.nativeElement as HTMLElement,
      'keydown'
    ).pipe(filter((event) => event.code === 'Enter'));
    // 入力完了イベント。テキスト変換が完了した状態でEnterキーが押下された場合に発火する
    const onInputComplete$ = compositionStatus$.pipe(
      switchMap((status) => (status === COMPOSITION_END ? onEnter$ : EMPTY))
    );

    this.state.hold(onInputComplete$, (e) => {
      this.changedTitle.emit(this.state.get('title'));
    });
  }
}
