import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { InputTimeModule } from '../input-time/input-time.module';
import { PopupModule } from '../popup/popup.module';
import { AdjustButtonComponent } from './adjust-button/adjust-button.component';
import { PlannedTimeControllerComponent } from './planned-time-controller/planned-time-controller.component';
import { TrackingLogChangePopupComponent } from './tracking-log-change-popup.component';
import { TrackingTimeControllerComponent } from './tracking-time-controller/tracking-time-controller.component';

@NgModule({
  declarations: [
    TrackingLogChangePopupComponent,
    AdjustButtonComponent,
    TrackingTimeControllerComponent,
    PlannedTimeControllerComponent,
  ],
  imports: [
    CommonModule,
    PopupModule,
    IconModule,
    InputTimeModule,
    ButtonModule,
  ],
  exports: [TrackingLogChangePopupComponent],
})
export class TrackingLogChangePopupModule {}
