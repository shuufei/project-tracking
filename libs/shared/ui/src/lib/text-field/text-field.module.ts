import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { TextFieldComponent } from './text-field.component';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [CommonModule, IconModule, ReactiveFormsModule],
  exports: [TextFieldComponent],
})
export class TextFieldModule {}
