import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
import {
  AssignChangeButtonModule,
  IconModule,
  SubtaskModule,
  TaskCardModule as UiTaskCardModule,
  TooltipModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { SubtaskFacadeModule } from '../../facade/subtask-facade/subtask-facade.module';
import { TaskFacadeModule } from '../../facade/task-facade/task-facade.module';
import { SubtaskItemModule } from './subtask-item/subtask-item.module';
import { TaskCardComponent } from './task-card.component';

@NgModule({
  declarations: [TaskCardComponent],
  imports: [
    CommonModule,
    UiTaskCardModule,
    AssignChangeButtonModule,
    IconModule,
    TooltipModule,
    SubtaskModule,
    TaskFacadeModule,
    SubtaskFacadeModule,
    DragDropModule,
    TuiNotificationsModule,
    SubtaskItemModule,
  ],
  exports: [TaskCardComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class TaskCardModule {}
