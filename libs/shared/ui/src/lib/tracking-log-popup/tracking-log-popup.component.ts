import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-tracking-log-popup',
  templateUrl: './tracking-log-popup.component.html',
  styleUrls: ['./tracking-log-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingLogPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
