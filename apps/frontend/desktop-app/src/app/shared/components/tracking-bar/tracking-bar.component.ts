import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'bis-tracking-bar',
  templateUrl: './tracking-bar.component.html',
  styleUrls: ['./tracking-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingBarComponent {
  @Input() trackingTimeSec = 0;
  @Input() scheduledTimeSec = 0;
  @Input() isTracking = false;
  @Output() clickedPlay = new EventEmitter<void>();
  @Output() clickedPause = new EventEmitter<void>();
  @Output() changedTrackingTimeSec = new EventEmitter<number>();
  @Output() changedScheduledTimeSec = new EventEmitter<number>();
}
