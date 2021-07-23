import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@bison/frontend/ui';
import { TaskDialogTemplateComponent } from './task-dialog-template.component';

@NgModule({
  declarations: [TaskDialogTemplateComponent],
  imports: [CommonModule, IconModule],
  exports: [TaskDialogTemplateComponent],
})
export class TaskDialogTemplateModule {}
