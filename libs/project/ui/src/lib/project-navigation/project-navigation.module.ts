import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ColorIconModule,
  IconModule,
  MenuItemModule,
  PopupModule,
  TooltipModule,
} from '@bison/shared/ui';
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
