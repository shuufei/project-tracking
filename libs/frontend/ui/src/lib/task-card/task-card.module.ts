import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardSelectPopupModule } from '../board-select-popup/board-select-popup.module';
import { ButtonModule } from '../button/button.module';
import { DeleteConfirmPopupModule } from '../delete-confirm-popup/delete-confirm-popup.module';
import { IconModule } from '../icon/icon.module';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { PopupModule } from '../popup/popup.module';
import { TimeLabelModule } from '../time-label/time-label.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TrackingLogChangeButtonModule } from '../tracking-log-change-button/tracking-log-change-button.module';
import { TaskCardComponent } from './task-card.component';

@NgModule({
  declarations: [TaskCardComponent],
  imports: [
    CommonModule,
    IconModule,
    PopupModule,
    MenuItemModule,
    TimeLabelModule,
    TrackingLogChangeButtonModule,
    ButtonModule,
    TooltipModule,
    DeleteConfirmPopupModule,
    BoardSelectPopupModule,
  ],
  exports: [TaskCardComponent],
})
export class TaskCardModule {}
