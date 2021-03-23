import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ui-tracking-log-popup',
  templateUrl: './tracking-log-popup.component.html',
  styleUrls: ['./tracking-log-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingLogPopupComponent {
  @Input() triggerEl?: HTMLElement;
  @Input() set userTrackingInfoList(list: UserTrackingInfo[]) {
    this.userTrackingInfoList$.next(list);
  }
  readonly userTrackingInfoList$ = new BehaviorSubject<UserTrackingInfo[]>([]);
}

export type UserTrackingInfo = {
  id: string;
  name: string;
  imageSrc?: string;
  trackingTime: {
    hours: number,
    minutes: number,
  };
}
