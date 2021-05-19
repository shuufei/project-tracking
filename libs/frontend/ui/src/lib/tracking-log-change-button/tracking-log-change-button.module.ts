import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeLabelModule } from '../time-label/time-label.module';
import { TrackingLogChangePopupModule } from '../tracking-log-change-popup/tracking-log-change-popup.module';
import { TrackingLogChangeButtonComponent } from './tracking-log-change-button.component';

@NgModule({
  declarations: [TrackingLogChangeButtonComponent],
  imports: [CommonModule, TimeLabelModule, TrackingLogChangePopupModule],
  exports: [TrackingLogChangeButtonComponent],
})
export class TrackingLogChangeButtonModule {}
