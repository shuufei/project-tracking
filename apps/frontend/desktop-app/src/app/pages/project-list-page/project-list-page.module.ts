import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  CreateProjectUsecase,
  CREATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  HeaderModule,
  IconModule,
  ProjectCardModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
  UserSelectPopupModule,
} from '@bison/frontend/ui';
import { ProjectPropertyEditFormModule } from '../../shared/components/project-property-edit-form/project-property-edit-form.module';
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
    SheetFooterModule,
    UserSelectPopupModule,
    ProjectPropertyEditFormModule,
  ],
  exports: [ProjectListPageComponent],
  providers: [
    {
      provide: CREATE_PROJECT_USECASE,
      useClass: CreateProjectUsecase,
    },
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ProjectListPageModule {}
