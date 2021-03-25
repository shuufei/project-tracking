import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupModule } from '../popup/popup.module';
import { UserIconModule } from '../user-icon/user-icon.module';
import { TrackingLogPopupComponent } from './tracking-log-popup.component';

@NgModule({
  declarations: [TrackingLogPopupComponent],
  imports: [
    CommonModule,
    PopupModule,
    UserIconModule,
  ],
  exports: [TrackingLogPopupComponent]
})
export class TrackingLogPopupModule { }
