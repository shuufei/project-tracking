import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaskReportModule } from '../task-report/task-report.module';
import { TaskReportCardComponent } from './task-report-card.component';

@NgModule({
  declarations: [TaskReportCardComponent],
  imports: [CommonModule, TaskReportModule],
  exports: [TaskReportCardComponent],
})
export class TaskReportCardModule {}
