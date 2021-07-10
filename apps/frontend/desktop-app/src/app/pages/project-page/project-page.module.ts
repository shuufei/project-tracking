import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import {
  MeStateQuery,
  ME_STATE_QUERY,
  ProjectStateQueryService,
  PROJECT_STATE_QUERY_SERVICE,
} from '@bison/frontend/application';
import { ME_DATA_STORE, PROJECT_DATA_STORE } from '@bison/frontend/domain';
import {
  MeDataStore,
  ProjectDataStore,
} from '@bison/frontend/infrastructure/data-store';
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

const meStateQueryProviders: Provider[] = [
  {
    provide: ME_STATE_QUERY,
    useClass: MeStateQuery,
  },
  {
    provide: ME_DATA_STORE,
    useClass: MeDataStore,
  },
];

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [CommonModule, ProjectPageRoutingModule],
  exports: [ProjectPageComponent],
  providers: [...projectStateQueryProviders, ...meStateQueryProviders],
})
export class ProjectPageModule {}
