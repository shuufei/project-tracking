import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonModule,
  ColorIconModule,
  ColorSelectPopupModule,
  HeaderModule,
  IconModule,
  ProjectCardModule,
  SheetFooterModule,
  SheetModule,
  TextareaModule,
  TextFieldModule,
  UserIconModule,
} from '@bison/frontend/ui';
import { ProjectCreateSheetComponent } from './components/project-create-sheet/project-create-sheet.component';
import { ProjectListPageRoutingModule } from './project-list-page-routing.module';
import { ProjectListPageComponent } from './project-list-page.component';

@NgModule({
  declarations: [ProjectListPageComponent, ProjectCreateSheetComponent],
  imports: [
    CommonModule,
    ProjectListPageRoutingModule,
    ButtonModule,
    IconModule,
    UserIconModule,
    ProjectCardModule,
    HeaderModule,
    SheetModule,
    ColorSelectPopupModule,
    ColorIconModule,
    TextFieldModule,
    TextareaModule,
    SheetFooterModule,
  ],
  exports: [ProjectListPageComponent],
})
export class ProjectListPageModule {}
