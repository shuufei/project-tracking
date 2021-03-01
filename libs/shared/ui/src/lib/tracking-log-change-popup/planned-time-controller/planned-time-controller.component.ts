import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-planned-time-controller',
  templateUrl: './planned-time-controller.component.html',
  styleUrls: ['./planned-time-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannedTimeControllerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
