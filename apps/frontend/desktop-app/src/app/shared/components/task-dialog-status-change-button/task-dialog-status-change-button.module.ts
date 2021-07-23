import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IconModule,
  StatusSelectPopupModule,
  TooltipModule,
} from '@bison/frontend/ui';
import { TaskDialogStatusChangeButtonComponent } from './task-dialog-status-change-button.component';

@NgModule({
  declarations: [TaskDialogStatusChangeButtonComponent],
  imports: [CommonModule, StatusSelectPopupModule, IconModule, TooltipModule],
  exports: [TaskDialogStatusChangeButtonComponent],
})
export class TaskDialogStatusChangeButtonModule {}
