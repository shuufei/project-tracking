import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ProjectStateQueryService,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { PROJECT_DATA_STORE } from '@bison/frontend/domain';
import { ProjectDataStore } from '@bison/frontend/infrastructure/data-store';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [CommonModule, ProjectPageRoutingModule],
  exports: [ProjectPageComponent],
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
export class ProjectPageModule {}
