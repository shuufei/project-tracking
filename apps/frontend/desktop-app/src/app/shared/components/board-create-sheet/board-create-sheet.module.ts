import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CreateBoardUsecase,
  CREATE_BOARD_USECASE,
} from '@bison/frontend/application';
import {
  ButtonModule,
  SheetFooterModule,
  SheetModule,
} from '@bison/frontend/ui';
import { BoardPropertyEditFormModule } from '../board-property-edit-form/board-property-edit-form.module';
import { BoardCreateSheetComponent } from './board-create-sheet.component';

@NgModule({
  declarations: [BoardCreateSheetComponent],
  imports: [
    CommonModule,
    SheetModule,
    BoardPropertyEditFormModule,
    SheetFooterModule,
    ButtonModule,
  ],
  exports: [BoardCreateSheetComponent],
  providers: [
    {
      provide: CREATE_BOARD_USECASE,
      useClass: CreateBoardUsecase,
    },
  ],
})
export class BoardCreateSheetModule {}
