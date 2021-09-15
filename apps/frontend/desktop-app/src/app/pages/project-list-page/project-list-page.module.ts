import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
import {
  ButtonModule,
  HeaderModule,
  IconModule,
  ProjectCardModule,
  UserIconModule,
  UserSelectPopupModule,
} from '@bison/frontend/ui';
import { ProjectCreateSheetModule } from '../../shared/components/project-create-sheet/project-create-sheet.module';
import { ProjectDeleteDialogModule } from '../../shared/components/project-delete-dialog/project-delete-dialog.module';
import { ProjectListPageRoutingModule } from './project-list-page-routing.module';
import { ProjectListPageComponent } from './project-list-page.component';

@NgModule({
  declarations: [ProjectListPageComponent],
  imports: [
    CommonModule,
    ProjectListPageRoutingModule,
    ButtonModule,
    IconModule,
    UserIconModule,
    ProjectCardModule,
    HeaderModule,
    UserSelectPopupModule,
    ProjectDeleteDialogModule,
    ProjectCreateSheetModule,
  ],
  exports: [ProjectListPageComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ProjectListPageModule {}
