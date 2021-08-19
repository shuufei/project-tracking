import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, MultiUserSelectPopupModule } from '@bison/frontend/ui';
import { BoardCreateSheetModule } from '../../shared/components/board-create-sheet/board-create-sheet.module';
import { BoardDeleteDialogModule } from '../../shared/components/board-delete-dialog/board-delete-dialog.module';
import { BoardUpdateSheetModule } from '../../shared/components/board-update-sheet/board-update-sheet.module';
import { ProjectAdminUpdateSheetModule } from '../../shared/components/project-admin-update-sheet/project-admin-update-sheet.module';
import { ProjectMemberUpdateSheetModule } from '../../shared/components/project-member-update-sheet/project-member-update-sheet.module';
import { ProjectUpdateSheetModule } from '../../shared/components/project-update-sheet/project-update-sheet.module';
import { TaskDialogModule } from '../../shared/components/task-dialog/task-dialog.module';
import { SandboxPageRoutingModule } from './sandbox-page-routing.module';
import { SandboxPageComponent } from './sandbox-page.component';

@NgModule({
  declarations: [SandboxPageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    SandboxPageRoutingModule,
    BoardCreateSheetModule,
    BoardUpdateSheetModule,
    BoardDeleteDialogModule,
    TaskDialogModule,
    MultiUserSelectPopupModule,
    ProjectAdminUpdateSheetModule,
    ProjectMemberUpdateSheetModule,
    ProjectUpdateSheetModule,
  ],
})
export class SandboxPageModule {}
