import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { MenuPopupModule } from '../menu-popup/menu-popup.module';
import { PopupModule } from '../popup/popup.module';
import { TimeLabelModule } from '../time-label/time-label.module';
import { TrackingLogChangeButtonModule } from '../tracking-log-change-button/tracking-log-change-button.module';
import { TaskCardComponent } from './task-card.component';

@NgModule({
  declarations: [TaskCardComponent],
  imports: [
    CommonModule,
    IconModule,
    PopupModule,
    MenuPopupModule,
    TimeLabelModule,
    TrackingLogChangeButtonModule,
  ],
  exports: [TaskCardComponent],
})
export class TaskCardModule {}
