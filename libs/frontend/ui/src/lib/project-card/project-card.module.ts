import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorIconModule } from '../color-icon/color-icon.module';
import { IconModule } from '../icon/icon.module';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { PopupModule } from '../popup/popup.module';
import { UserIconListModule } from '../user-icon-list/user-icon-list.module';
import { UserIconModule } from '../user-icon/user-icon.module';
import { ProjectCardComponent } from './project-card.component';

@NgModule({
  declarations: [ProjectCardComponent],
  imports: [
    CommonModule,
    ColorIconModule,
    IconModule,
    PopupModule,
    MenuItemModule,
    UserIconModule,
    UserIconListModule,
  ],
  exports: [ProjectCardComponent],
})
export class ProjectCardModule {}
