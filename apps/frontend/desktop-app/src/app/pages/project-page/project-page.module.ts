import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { StateQuery, STATE_QUERY } from '@bison/frontend/application';
import { ME_DATA_STORE, PROJECT_DATA_STORE } from '@bison/frontend/domain';
import {
  MeDataStore,
  ProjectDataStore,
} from '@bison/frontend/infrastructure/data-store';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

const stateQueryProviders: Provider[] = [
  {
    provide: STATE_QUERY,
    useClass: StateQuery,
  },
  {
    provide: PROJECT_DATA_STORE,
    useClass: ProjectDataStore,
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
  providers: [...stateQueryProviders],
})
export class ProjectPageModule {}
