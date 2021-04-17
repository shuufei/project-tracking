import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FETCH_PROJECTS_SERVICE,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';
import {
  MockFetchProjectsService,
  MockProjectStateQueryService,
} from './testing/mock';

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
      useValue: new MockProjectStateQueryService(),
    },
  ],
})
export class ProjectPageModule {}
