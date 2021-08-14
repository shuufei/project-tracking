import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlannedTimeControllerModule } from '../planned-time-controller/planned-time-controller.module';
import { PopupModule } from '../popup/popup.module';
import { TimeLabelModule } from '../time-label/time-label.module';
import { ScheduledTimeSecChangeButtonComponent } from './scheduled-time-sec-change-button.component';

@NgModule({
  declarations: [ScheduledTimeSecChangeButtonComponent],
  imports: [
    CommonModule,
    TimeLabelModule,
    PopupModule,
    PlannedTimeControllerModule,
  ],
  exports: [ScheduledTimeSecChangeButtonComponent],
})
export class ScheduledTimeSecChangeButtonModule {}
