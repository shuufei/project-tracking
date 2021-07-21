import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  UpdateProjectMembersUsecase,
  UpdateProjectUsecase,
  UPDATE_PROJECT_MEMBERS_USECASE,
  UPDATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
  UserSelectPopupModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { BoardCreateSheetModule } from '../../shared/components/board-create-sheet/board-create-sheet.module';
import { ProjectPropertyEditFormModule } from '../../shared/components/project-property-edit-form/project-property-edit-form.module';
import { ProjectMemberUpdateSheetComponent } from './components/project-member-update-sheet/project-member-update-sheet.component';
import { ProjectUpdateSheetComponent } from './components/project-update-sheet/project-update-sheet.component';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectUpdateSheetComponent,
    ProjectMemberUpdateSheetComponent,
  ],
  imports: [
    CommonModule,
    ProjectPageRoutingModule,
    SheetModule,
    ButtonModule,
    ProjectPropertyEditFormModule,
    SheetFooterModule,
    UserSelectPopupModule,
    UserIconModule,
    TuiNotificationsModule,
    BoardCreateSheetModule,
  ],
  exports: [ProjectPageComponent],
  providers: [
    {
      provide: UPDATE_PROJECT_USECASE,
      useClass: UpdateProjectUsecase,
    },
    {
      provide: UPDATE_PROJECT_MEMBERS_USECASE,
      useClass: UpdateProjectMembersUsecase,
    },
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ProjectPageModule {}
