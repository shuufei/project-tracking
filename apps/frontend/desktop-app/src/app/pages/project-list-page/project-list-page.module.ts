import { CommonModule } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { StateQuery, STATE_QUERY } from '@bison/frontend/application';
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
  providers: [...stateQueryProviders],
})
export class ProjectListPageModule {}
