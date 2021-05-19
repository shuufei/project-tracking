import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorIconModule } from '../color-icon/color-icon.module';
import { IconModule } from '../icon/icon.module';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { PopupModule } from '../popup/popup.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { NavBoardItemComponent } from './nav-board-item/nav-board-item.component';
import { NavProjectItemComponent } from './nav-project-item/nav-project-item.component';
import { ProjectNavigationComponent } from './project-navigation.component';

@NgModule({
  declarations: [
    NavProjectItemComponent,
    NavBoardItemComponent,
    ProjectNavigationComponent,
  ],
  imports: [
    CommonModule,
    ColorIconModule,
    IconModule,
    PopupModule,
    MenuItemModule,
    TooltipModule,
  ],
  exports: [ProjectNavigationComponent],
})
export class ProjectNavigationModule {}
