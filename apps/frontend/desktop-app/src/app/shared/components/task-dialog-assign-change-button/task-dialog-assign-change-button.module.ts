import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IconModule,
  TooltipModule,
  UserIconModule,
  UserSelectPopupModule,
} from '@bison/frontend/ui';
import { TaskDialogAssignChangeButtonComponent } from './task-dialog-assign-change-button.component';

@NgModule({
  declarations: [TaskDialogAssignChangeButtonComponent],
  imports: [
    CommonModule,
    UserSelectPopupModule,
    UserIconModule,
    TooltipModule,
    IconModule,
  ],
  exports: [TaskDialogAssignChangeButtonComponent],
})
export class TaskDialogAssignChangeButtonModule {}
