import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ColorIconModule,
  IconModule,
  TextareaModule,
  TextFieldModule,
} from '@bison/frontend/ui';
import { BoardPropertyEditFormComponent } from './board-property-edit-form.component';

@NgModule({
  declarations: [BoardPropertyEditFormComponent],
  imports: [
    CommonModule,
    TextFieldModule,
    TextareaModule,
    ColorIconModule,
    IconModule,
  ],
  exports: [BoardPropertyEditFormComponent],
})
export class BoardPropertyEditFormModule {}
