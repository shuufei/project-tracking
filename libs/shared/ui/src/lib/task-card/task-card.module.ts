import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { PopupModule } from '../popup/popup.module';
import { TimeLabelModule } from '../time-label/time-label.module';
import { TrackingLogChangeButtonModule } from '../tracking-log-change-button/tracking-log-change-button.module';
import { MenuItemComponent } from './menu-popup/menu-item/menu-item.component';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';
import { TaskCardComponent } from './task-card.component';

@NgModule({
  declarations: [TaskCardComponent, MenuPopupComponent, MenuItemComponent],
  imports: [
    CommonModule,
    IconModule,
    PopupModule,
    TimeLabelModule,
    TrackingLogChangeButtonModule,
  ],
  exports: [TaskCardComponent],
})
export class TaskCardModule {}
