import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { SheetComponent } from './sheet.component';

@NgModule({
  declarations: [SheetComponent],
  imports: [CommonModule, IconModule],
  exports: [SheetComponent],
})
export class SheetModule {}
