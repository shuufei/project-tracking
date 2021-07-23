import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupModule } from '../popup/popup.module';
import { SelectItemModule } from '../select-item/select-item.module';
import { BoardSelectPopupComponent } from './board-select-popup.component';

@NgModule({
  declarations: [BoardSelectPopupComponent],
  imports: [CommonModule, PopupModule, SelectItemModule],
  exports: [BoardSelectPopupComponent],
})
export class BoardSelectPopupModule {}
