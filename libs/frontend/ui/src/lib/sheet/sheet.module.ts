import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon/icon.module';
import { SheetComponent } from './sheet.component';

@NgModule({
  declarations: [SheetComponent],
  imports: [CommonModule, IconModule, BrowserModule, BrowserAnimationsModule],
  exports: [SheetComponent],
})
export class SheetModule {}
