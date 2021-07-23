import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule, IconModule } from '@bison/frontend/ui';
import { SubtaskCardModule } from '../subtask-card/subtask-card.module';
import { TaskDialogAssignChangeButtonModule } from '../task-dialog-assign-change-button/task-dialog-assign-change-button.module';
import { TaskDialogBoardChangeButtonModule } from '../task-dialog-board-change-button/task-dialog-board-change-button.module';
import { TaskDialogProjectChangeButtonModule } from '../task-dialog-project-change-button/task-dialog-project-change-button.module';
import { TaskDialogStatusChangeButtonModule } from '../task-dialog-status-change-button/task-dialog-status-change-button.module';
import { TaskDialogTemplateModule } from '../task-dialog-template/task-dialog-template.module';
import { TrackingBarModule } from '../tracking-bar/tracking-bar.module';
import { TaskDialogComponent } from './task-dialog.component';

@NgModule({
  declarations: [TaskDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    TaskDialogTemplateModule,
    TrackingBarModule,
    TaskDialogStatusChangeButtonModule,
    TaskDialogAssignChangeButtonModule,
    TaskDialogProjectChangeButtonModule,
    TaskDialogBoardChangeButtonModule,
    IconModule,
    SubtaskCardModule,
  ],
  exports: [TaskDialogComponent],
})
export class TaskDialogModule {}
