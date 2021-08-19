import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { ColorIconModule } from '../color-icon/color-icon.module';
import { ProjectDescriptionComponent } from './project-description.component';

@NgModule({
  declarations: [ProjectDescriptionComponent],
  imports: [
    CommonModule,
    ColorIconModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports: [ProjectDescriptionComponent]
})
export class ProjectDescriptionModule { }
