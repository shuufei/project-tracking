import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdjustButtonModule } from '../adjust-button/adjust-button.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { InputTimeModule } from '../input-time/input-time.module';
import { PlannedTimeControllerModule } from '../planned-time-controller/planned-time-controller.module';
import { PopupModule } from '../popup/popup.module';
import { TrackingLogChangePopupComponent } from './tracking-log-change-popup.component';
import { TrackingTimeControllerComponent } from './tracking-time-controller/tracking-time-controller.component';

@NgModule({
  declarations: [
    TrackingLogChangePopupComponent,
    TrackingTimeControllerComponent,
  ],
  imports: [
    CommonModule,
    PopupModule,
    IconModule,
    InputTimeModule,
    ButtonModule,
    AdjustButtonModule,
    PlannedTimeControllerModule,
  ],
  exports: [TrackingLogChangePopupComponent],
})
export class TrackingLogChangePopupModule {}
