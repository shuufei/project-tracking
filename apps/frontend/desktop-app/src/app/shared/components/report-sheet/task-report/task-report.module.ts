import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserIconModule } from '@bison/frontend/ui';
import { TaskReportComponent } from './task-report.component';

@NgModule({
  declarations: [TaskReportComponent],
  imports: [CommonModule, UserIconModule],
  exports: [TaskReportComponent],
})
export class TaskReportModule {}
