import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
import {
  BoardItemModule,
  ButtonModule,
  ColorIconModule,
  HeaderModule,
  IconModule,
  MenuItemModule,
  MultiUserSelectPopupModule,
  PopupModule,
  ProjectNavigationModule,
  SheetFooterModule,
  SheetModule,
  UserIconModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { BoardCreateSheetModule } from '../../shared/components/board-create-sheet/board-create-sheet.module';
import { BoardDeleteDialogModule } from '../../shared/components/board-delete-dialog/board-delete-dialog.module';
import { BoardUpdateSheetModule } from '../../shared/components/board-update-sheet/board-update-sheet.module';
import { ProjectAdminUpdateSheetModule } from '../../shared/components/project-admin-update-sheet/project-admin-update-sheet.module';
import { ProjectCreateSheetModule } from '../../shared/components/project-create-sheet/project-create-sheet.module';
import { ProjectDeleteDialogModule } from '../../shared/components/project-delete-dialog/project-delete-dialog.module';
import { ProjectMemberUpdateSheetModule } from '../../shared/components/project-member-update-sheet/project-member-update-sheet.module';
import { ProjectPropertyEditFormModule } from '../../shared/components/project-property-edit-form/project-property-edit-form.module';
import { ProjectUpdateSheetModule } from '../../shared/components/project-update-sheet/project-update-sheet.module';
import { TaskCardModule } from '../../shared/components/task-card/task-card.module';
import { TaskDialogModule } from '../../shared/components/task-dialog/task-dialog.module';
import { BoardDetailHeaderComponent } from './components/board-detail-header/board-detail-header.component';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { ProjectDetailHeaderComponent } from './components/project-detail-header/project-detail-header.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectDetailComponent,
    BoardDetailComponent,
    BoardDetailHeaderComponent,
    ProjectPageComponent,
    ProjectDetailHeaderComponent,
  ],
  imports: [
    CommonModule,
    ProjectPageRoutingModule,
    ProjectNavigationModule,
    SheetModule,
    ButtonModule,
    ProjectPropertyEditFormModule,
    SheetFooterModule,
    UserIconModule,
    TuiNotificationsModule,
    BoardUpdateSheetModule,
    BoardDeleteDialogModule,
    ProjectUpdateSheetModule,
    ProjectAdminUpdateSheetModule,
    BoardCreateSheetModule,
    TaskDialogModule,
    MultiUserSelectPopupModule,
    IconModule,
    HeaderModule,
    PopupModule,
    MenuItemModule,
    TaskCardModule,
    DragDropModule,
    ProjectDeleteDialogModule,
    BoardDeleteDialogModule,
    ColorIconModule,
    BoardItemModule,
    ProjectMemberUpdateSheetModule,
    BoardUpdateSheetModule,
    BoardDeleteDialogModule,
    IconModule,
    ProjectCreateSheetModule,
  ],
  exports: [ProjectPageComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class ProjectPageModule {}
