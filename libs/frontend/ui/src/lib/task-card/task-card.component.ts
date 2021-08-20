import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  title: string;
  scheduledTimeSec?: number;
  workTimeSec?: number;
  isTracking: boolean;
  isHover: boolean;
};

@Component({
  selector: 'ui-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskCardComponent implements OnInit {
  @Input()
  set title(value: string) {
    this.state.set('title', () => value);
  }
  @Input()
  set scheduledTimeSec(value: number) {
    this.state.set('scheduledTimeSec', () => value);
  }
  @Input()
  set workTimeSec(value: number) {
    this.state.set('workTimeSec', () => value);
  }
  @Input()
  set isTracking(value: boolean) {
    this.state.set('isTracking', () => value);
  }
  @Output() hover = new EventEmitter<boolean>();
  @Output() changedTrackingTimeSec = new EventEmitter<number>();
  @Output() changedPlannedTimeSec = new EventEmitter<number>();

  // State
  readonly state$ = this.state.select();

  // Events
  readonly onChangedTrackingTimeSec$ = new Subject<number>();
  readonly onChangedPlannedTimeSec$ = new Subject<number>();

  constructor(private state: RxState<State>) {
    this.state.set({
      title: '',
      isTracking: false,
    });
  }

  ngOnInit() {
    this.state.connect('workTimeSec', this.onChangedTrackingTimeSec$);
    this.state.connect('scheduledTimeSec', this.onChangedPlannedTimeSec$);
    this.state.hold(this.state.select('workTimeSec'), (sec) => {
      this.changedTrackingTimeSec.emit(sec);
    });
    this.state.hold(this.state.select('scheduledTimeSec'), (sec) => {
      this.changedPlannedTimeSec.emit(sec);
    });
    this.state.hold(this.state.select('isHover'), (isHover) => {
      this.hover.emit(isHover);
    });
  }

  @HostListener('mouseenter', [])
  onMouseEnter() {
    this.state.set('isHover', () => true);
  }

  @HostListener('mouseleave', [])
  onMouseLeave() {
    this.state.set('isHover', () => false);
  }
}
