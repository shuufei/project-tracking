import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import {
  ProjectStateQueryService,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { PROJECT_DATA_STORE } from '@bison/frontend/domain';
import { ProjectDataStore } from '@bison/frontend/infrastructure/data-store';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

const projectStateQueryProviders: Provider[] = [
  {
    provide: PROJECT_STATE_QUERY_SERVICE,
    useClass: ProjectStateQueryService,
  },
  {
    provide: PROJECT_DATA_STORE,
    useClass: ProjectDataStore,
  },
];

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [CommonModule, ProjectPageRoutingModule],
  exports: [ProjectPageComponent],
  providers: [...projectStateQueryProviders],
})
export class ProjectPageModule {}
