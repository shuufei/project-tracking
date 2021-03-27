import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ColorIconModule,
  MenuPopupModule,
  UserIconListModule,
  UserIconModule,
} from '@bison/shared/ui';
import { ProjectCardComponent } from './project-card.component';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    ColorIconModule,
    MenuPopupModule,
    UserIconModule,
    UserIconListModule,
  ],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
