import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  CreateProjectUsecase,
  CREATE_PROJECT_USECASE,
  UpdateProjectMembersUsecase,
  UPDATE_PROJECT_MEMBERS_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  MultiUserSelectPopupModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { ProjectPropertyEditFormModule } from '../../../../shared/components/project-property-edit-form/project-property-edit-form.module';
import { ProjectCreateSheetComponent } from './project-create-sheet.component';

@NgModule({
  declarations: [ProjectCreateSheetComponent],
  imports: [
    CommonModule,
    SheetModule,
    ProjectPropertyEditFormModule,
    UserIconModule,
    ButtonModule,
    MultiUserSelectPopupModule,
    SheetFooterModule,
    TuiNotificationsModule,
  ],
  exports: [ProjectCreateSheetComponent],
  providers: [
    {
      provide: CREATE_PROJECT_USECASE,
      useClass: CreateProjectUsecase,
    },
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
    {
      provide: UPDATE_PROJECT_MEMBERS_USECASE,
      useClass: UpdateProjectMembersUsecase,
    },
  ],
})
export class ProjectCreateSheetModule {}
