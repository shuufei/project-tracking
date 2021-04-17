import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FETCH_PROJECTS_SERVICE,
  ProjectStateQueryService,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { PROJECT_DATA_STOR } from '@bison/frontend/domain';
import { ProjectDataStore } from '@bison/frontend/infrastructure/repository';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';
import { MockFetchProjectsService } from './testing/mock';

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [CommonModule, ProjectPageRoutingModule],
  providers: [
    {
      provide: FETCH_PROJECTS_SERVICE,
      useValue: new MockFetchProjectsService(),
    },
    {
      provide: PROJECT_STATE_QUERY_SERVICE,
      useClass: ProjectStateQueryService,
    },
    {
      provide: PROJECT_DATA_STOR,
      useClass: ProjectDataStore,
    },
  ],
})
export class ProjectPageModule {}
