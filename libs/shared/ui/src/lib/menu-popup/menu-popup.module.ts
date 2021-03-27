import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { PopupModule } from '../popup/popup.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuPopupComponent } from './menu-popup.component';

@NgModule({
  declarations: [MenuPopupComponent, MenuItemComponent],
  imports: [CommonModule, IconModule, PopupModule],
  exports: [MenuPopupComponent],
})
export class MenuPopupModule {}
