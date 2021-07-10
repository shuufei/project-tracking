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
  providers: [...projectStateQueryProviders, ...meStateQueryProviders],
})
export class ProjectListPageModule {}
