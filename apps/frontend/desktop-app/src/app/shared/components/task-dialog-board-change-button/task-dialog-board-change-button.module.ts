import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BoardSelectPopupModule,
  IconModule,
  TooltipModule,
} from '@bison/frontend/ui';
import { TaskDialogBoardChangeButtonComponent } from './task-dialog-board-change-button.component';

@NgModule({
  declarations: [TaskDialogBoardChangeButtonComponent],
  imports: [CommonModule, BoardSelectPopupModule, IconModule, TooltipModule],
  exports: [TaskDialogBoardChangeButtonComponent],
})
export class TaskDialogBoardChangeButtonModule {}
