import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  UpdateProjectUsecase,
  UPDATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  SheetFooterModule,
  SheetModule,
} from '@bison/frontend/ui';
import { ProjectPropertyEditFormModule } from '../../shared/components/project-property-edit-form/project-property-edit-form.module';
import { ProjectUpdateSheetComponent } from './components/project-update-sheet/project-update-sheet.component';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [ProjectPageComponent, ProjectUpdateSheetComponent],
  imports: [
    CommonModule,
    ProjectPageRoutingModule,
    SheetModule,
    ButtonModule,
    ProjectPropertyEditFormModule,
    SheetFooterModule,
  ],
  exports: [ProjectPageComponent],
  providers: [
    {
      provide: UPDATE_PROJECT_USECASE,
      useClass: UpdateProjectUsecase,
    },
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ProjectPageModule {}
