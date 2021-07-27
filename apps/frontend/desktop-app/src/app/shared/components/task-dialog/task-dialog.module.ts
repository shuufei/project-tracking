import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  UpdateTaskUsecase,
  UPDATE_TASK_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  DialogModule,
  IconModule,
  TextareaModule,
  TextFieldModule,
  TooltipModule,
} from '@bison/frontend/ui';
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
    ButtonModule,
    TextFieldModule,
    TextareaModule,
    TooltipModule,
  ],
  exports: [TaskDialogComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
    {
      provide: UPDATE_TASK_USECASE,
      useClass: UpdateTaskUsecase,
    },
  ],
})
export class TaskDialogModule {}
