import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SheetModule } from '@bison/frontend/ui';
import { ReportSheetComponent } from './report-sheet.component';

@NgModule({
  declarations: [ReportSheetComponent],
  imports: [CommonModule, SheetModule],
  exports: [ReportSheetComponent],
})
export class ReportSheetModule {}
