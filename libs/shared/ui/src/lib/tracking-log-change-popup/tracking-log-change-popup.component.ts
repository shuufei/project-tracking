import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ChangedTimeEvent } from '../input-time/input-time.component';

@Component({
  selector: 'ui-tracking-log-change-popup',
  templateUrl: './tracking-log-change-popup.component.html',
  styleUrls: ['./tracking-log-change-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingLogChangePopupComponent {
  @Input() triggerEl?: HTMLElement;
  @Input() trackingTime: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  @Input() plannedTime?: Time;
  @Output() changedTrackingTime = new EventEmitter<ChangedTimeEvent>();
  @Output() changedPlannedTime = new EventEmitter<ChangedTimeEvent>();
}

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};
