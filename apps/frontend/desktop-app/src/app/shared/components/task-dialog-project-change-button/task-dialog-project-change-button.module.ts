import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorIconModule, IconModule, TooltipModule } from '@bison/frontend/ui';
import { TaskDialogProjectChangeButtonComponent } from './task-dialog-project-change-button.component';

@NgModule({
  declarations: [TaskDialogProjectChangeButtonComponent],
  imports: [CommonModule, TooltipModule, IconModule, ColorIconModule],
  exports: [TaskDialogProjectChangeButtonComponent],
})
export class TaskDialogProjectChangeButtonModule {}
