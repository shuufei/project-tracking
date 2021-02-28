import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { InputTimeModule } from '../input-time/input-time.module';
import { PopupModule } from '../popup/popup.module';
import { TrackingLogChangePopupComponent } from './tracking-log-change-popup.component';

@NgModule({
  declarations: [TrackingLogChangePopupComponent],
  imports: [CommonModule, PopupModule, IconModule, InputTimeModule],
  exports: [TrackingLogChangePopupComponent],
})
export class TrackingLogChangePopupModule {}
