import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DeleteBoardUsecase,
  DELETE_BOARD_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  ColorIconModule,
  DialogModule,
  IconModule,
  SheetFooterModule,
} from '@bison/frontend/ui';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { BoardDeleteDialogComponent } from './board-delete-dialog.component';

@NgModule({
  declarations: [BoardDeleteDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ColorIconModule,
    IconModule,
    SheetFooterModule,
    TuiNotificationsModule,
  ],
  exports: [BoardDeleteDialogComponent],
  providers: [
    {
      provide: DELETE_BOARD_USECASE,
      useClass: DeleteBoardUsecase,
    },
  ],
})
export class BoardDeleteDialogModule {}
