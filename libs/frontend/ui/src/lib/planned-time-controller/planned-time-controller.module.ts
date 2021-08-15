import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdjustButtonModule } from '../adjust-button/adjust-button.module';
import { InputTimeModule } from '../input-time/input-time.module';
import { PlannedTimeControllerComponent } from './planned-time-controller.component';

@NgModule({
  declarations: [PlannedTimeControllerComponent],
  imports: [CommonModule, InputTimeModule, AdjustButtonModule],
  exports: [PlannedTimeControllerComponent],
})
export class PlannedTimeControllerModule {}
