import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ColorIconModule,
  ColorSelectPopupModule,
  IconModule,
  TextareaModule,
  TextFieldModule,
} from '@bison/frontend/ui';
import { ProjectPropertyEditFormComponent } from './project-property-edit-form.component';

@NgModule({
  declarations: [ProjectPropertyEditFormComponent],
  imports: [
    CommonModule,
    TextFieldModule,
    TextareaModule,
    ColorSelectPopupModule,
    ColorIconModule,
    IconModule,
  ],
  exports: [ProjectPropertyEditFormComponent],
})
export class ProjectPropertyEditFormModule {}
