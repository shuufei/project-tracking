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
  MultiUserSelectPopupModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { BoardCreateSheetModule } from '../../shared/components/board-create-sheet/board-create-sheet.module';
import { BoardDeleteDialogModule } from '../../shared/components/board-delete-dialog/board-delete-dialog.module';
import { BoardUpdateSheetModule } from '../../shared/components/board-update-sheet/board-update-sheet.module';
import { ProjectAdminUpdateSheetModule } from '../../shared/components/project-admin-update-sheet/project-admin-update-sheet.module';
import { ProjectPropertyEditFormModule } from '../../shared/components/project-property-edit-form/project-property-edit-form.module';
import { TaskDialogModule } from '../../shared/components/task-dialog/task-dialog.module';
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
    UserIconModule,
    TuiNotificationsModule,
    BoardCreateSheetModule,
    BoardUpdateSheetModule,
    BoardDeleteDialogModule,
    TaskDialogModule,
    MultiUserSelectPopupModule,
    ProjectAdminUpdateSheetModule,
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
