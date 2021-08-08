import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
  DeleteSubtaskUsecase,
  DELETE_SUBTASK_USECASE,
  UpdateSubtaskUsecase,
  UPDATE_SUBTASK_USECASE,
} from '@bison/frontend/application';
import {
  AssignChangeButtonModule,
  CheckboxModule,
  IconModule,
  MenuItemModule,
  PopupModule,
} from '@bison/frontend/ui';
import { DeleteConfirmPopupModule } from '../delete-confirm-popup/delete-confirm-popup.module';
import { TrackingBarModule } from '../tracking-bar/tracking-bar.module';
import { SubtaskCardComponent } from './subtask-card.component';

@NgModule({
  declarations: [SubtaskCardComponent],
  imports: [
    CommonModule,
    IconModule,
    PopupModule,
    MenuItemModule,
    TrackingBarModule,
    CheckboxModule,
    AssignChangeButtonModule,
    DeleteConfirmPopupModule,
  ],
  exports: [SubtaskCardComponent],
  providers: [
    {
      provide: APOLLO_DATA_QUERY,
      useClass: ApolloDataQuery,
    },
    {
      provide: UPDATE_SUBTASK_USECASE,
      useClass: UpdateSubtaskUsecase,
    },
    {
      provide: DELETE_SUBTASK_USECASE,
      useClass: DeleteSubtaskUsecase,
    },
  ],
})
export class SubtaskCardModule {}
