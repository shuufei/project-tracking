import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SheetModule } from '@bison/frontend/ui';
import { ReportSheetComponent } from './report-sheet.component';
import { TaskGroupReportCardModule } from './task-group-report-card/task-group-report-card.module';
import { TaskReportCardModule } from './task-report-card/task-report-card.module';
import { TaskReportModule } from './task-report/task-report.module';

@NgModule({
  declarations: [ReportSheetComponent],
  imports: [
    CommonModule,
    SheetModule,
    TaskReportModule,
    TaskReportCardModule,
    TaskGroupReportCardModule,
  ],
  exports: [ReportSheetComponent],
})
export class ReportSheetModule {}
