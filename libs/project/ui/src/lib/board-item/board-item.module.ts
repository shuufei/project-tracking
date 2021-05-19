import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule, MenuItemModule, PopupModule } from '@bison/frontend/ui';
import { BoardItemComponent } from './board-item.component';

@NgModule({
  declarations: [BoardItemComponent],
  imports: [CommonModule, IconModule, PopupModule, MenuItemModule],
  exports: [BoardItemComponent],
})
export class BoardItemModule {}
