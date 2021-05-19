import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ColorIconModule,
  IconModule,
  MenuItemModule,
  PopupModule,
  UserIconListModule,
  UserIconModule,
} from '@bison/frontend/ui';
import { ProjectCardComponent } from './project-card.component';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    ColorIconModule,
    IconModule,
    PopupModule,
    MenuItemModule,
    UserIconModule,
    UserIconListModule,
  ],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
