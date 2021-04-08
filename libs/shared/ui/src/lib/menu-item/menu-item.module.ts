import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { MenuItemComponent } from './menu-item.component';

@NgModule({
  declarations: [MenuItemComponent],
  imports: [CommonModule, IconModule],
  exports: [MenuItemComponent],
})
export class MenuItemModule {}
