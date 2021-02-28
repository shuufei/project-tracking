import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChangedTimeEvent } from '../input-time/input-time.component';

@Component({
  selector: 'ui-tracking-log-change-popup',
  templateUrl: './tracking-log-change-popup.component.html',
  styleUrls: ['./tracking-log-change-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackingLogChangePopupComponent {
  @Input() triggerEl?: HTMLElement;

  onChangedTime(time: ChangedTimeEvent) {
    console.log('change time: ', time);
  }
}
