import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MultiUserSelectPopupModule } from '@bison/frontend/ui';
import { BoardCreateSheetModule } from '../../shared/components/board-create-sheet/board-create-sheet.module';
import { BoardDeleteDialogModule } from '../../shared/components/board-delete-dialog/board-delete-dialog.module';
import { BoardUpdateSheetModule } from '../../shared/components/board-update-sheet/board-update-sheet.module';
import { ProjectAdminUpdateSheetModule } from '../../shared/components/project-admin-update-sheet/project-admin-update-sheet.module';
import { ProjectMemberUpdateSheetModule } from '../../shared/components/project-member-update-sheet/project-member-update-sheet.module';
import { ProjectUpdateSheetModule } from '../../shared/components/project-update-sheet/project-update-sheet.module';
import { TaskDialogModule } from '../../shared/components/task-dialog/task-dialog.module';
import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [
    CommonModule,
    ProjectPageRoutingModule,
    BoardCreateSheetModule,
    BoardUpdateSheetModule,
    BoardDeleteDialogModule,
    TaskDialogModule,
    MultiUserSelectPopupModule,
    ProjectAdminUpdateSheetModule,
    ProjectMemberUpdateSheetModule,
    ProjectUpdateSheetModule,
  ],
  exports: [ProjectPageComponent],
  providers: [],
})
export class ProjectPageModule {}
