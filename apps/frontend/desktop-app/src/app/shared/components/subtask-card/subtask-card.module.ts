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
  DeleteConfirmPopupModule,
  IconModule,
  MenuItemModule,
  PopupModule,
  TextFieldModule,
} from '@bison/frontend/ui';
import { SubtaskFacadeModule } from '../../facade/subtask-facade/subtask-facade.module';
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
    TextFieldModule,
    SubtaskFacadeModule,
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
