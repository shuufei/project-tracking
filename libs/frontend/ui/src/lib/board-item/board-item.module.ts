import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { PopupModule } from '../popup/popup.module';
import { BoardItemComponent } from './board-item.component';

@NgModule({
  declarations: [BoardItemComponent],
  imports: [CommonModule, IconModule, PopupModule, MenuItemModule],
  exports: [BoardItemComponent],
})
export class BoardItemModule {}
