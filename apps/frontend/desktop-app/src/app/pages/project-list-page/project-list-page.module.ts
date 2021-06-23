import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ProjectStateQueryService,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { PROJECT_DATA_STORE } from '@bison/frontend/domain';
import { ProjectDataStore } from '@bison/frontend/infrastructure/data-store';
import {
  ButtonModule,
  HeaderModule,
  IconModule,
  ProjectCardModule,
  UserIconModule,
} from '@bison/frontend/ui';
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
  ],
  exports: [ProjectListPageComponent],
  providers: [
    {
      provide: PROJECT_STATE_QUERY_SERVICE,
      useClass: ProjectStateQueryService,
    },
    {
      provide: PROJECT_DATA_STORE,
      useClass: ProjectDataStore,
    },
  ],
})
export class ProjectListPageModule {}
