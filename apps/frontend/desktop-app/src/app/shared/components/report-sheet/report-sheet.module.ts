import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
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
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ReportSheetModule {}
