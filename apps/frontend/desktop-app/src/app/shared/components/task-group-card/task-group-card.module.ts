import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
import {
  AssignChangeButtonModule,
  BoardSelectPopupModule,
  DeleteConfirmPopupModule,
  IconModule,
  MenuItemModule,
  PopupModule,
  ScheduledTimeSecChangeButtonModule,
  StatusSelectPopupModule,
  TextFieldModule,
} from '@bison/frontend/ui';
import { TaskFacadeModule } from '../../facade/task-facade/task-facade.module';
import { TaskGroupFacadeModule } from '../../facade/task-group-facade/task-group-facade.module';
import { TaskCardModule } from '../task-card/task-card.module';
import { TaskGroupCardComponent } from './task-group-card.component';

@NgModule({
  declarations: [TaskGroupCardComponent],
  imports: [
    CommonModule,
    // frontend/desktop-app components
    TaskCardModule,
    // frontend/desktop-app facade
    TaskGroupFacadeModule,
    TaskFacadeModule,
    // frontend/ui components
    ScheduledTimeSecChangeButtonModule,
    StatusSelectPopupModule,
    AssignChangeButtonModule,
    IconModule,
    PopupModule,
    MenuItemModule,
    DeleteConfirmPopupModule,
    BoardSelectPopupModule,
    TextFieldModule,
    // Angular CDK
    DragDropModule,
  ],
  exports: [TaskGroupCardComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
  ],
})
export class TaskGroupCardModule {}
