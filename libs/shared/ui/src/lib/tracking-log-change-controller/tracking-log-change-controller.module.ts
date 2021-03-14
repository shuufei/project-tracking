import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeLabelModule } from '../time-label/time-label.module';
import { TrackingLogChangePopupModule } from '../tracking-log-change-popup/tracking-log-change-popup.module';
import { TrackingLogChangeControllerComponent } from './tracking-log-change-controller.component';

@NgModule({
  declarations: [TrackingLogChangeControllerComponent],
  imports: [CommonModule, TimeLabelModule, TrackingLogChangePopupModule],
  exports: [TrackingLogChangeControllerComponent],
})
export class TrackingLogChangeControllerModule {}
