import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { InputTimeComponent } from './input-time.component';

@NgModule({
  declarations: [InputTimeComponent],
  imports: [CommonModule, IconModule, ReactiveFormsModule],
  exports: [InputTimeComponent],
})
export class InputTimeModule {}
