import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaskReportCardModule } from '../task-report-card/task-report-card.module';
import { TaskReportModule } from '../task-report/task-report.module';
import { TaskGroupReportCardComponent } from './task-group-report-card.component';

@NgModule({
  declarations: [TaskGroupReportCardComponent],
  imports: [CommonModule, TaskReportCardModule, TaskReportModule],
  exports: [TaskGroupReportCardComponent],
})
export class TaskGroupReportCardModule {}
