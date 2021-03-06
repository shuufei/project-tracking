import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { ColorIconModule } from './color-icon/color-icon.module';
import { ColorSelectPopupModule } from './color-select-popup/color-select-popup.module';
import { IconModule } from './icon/icon.module';
import { InputTimeModule } from './input-time/input-time.module';
import { NavigationModule } from './navigation/navigation.module';
import { PopupModule } from './popup/popup.module';
import { ProjectBoardSelectPopupModule } from './project-board-select-popup/project-board-select-popup.module';
import { SelectItemModule } from './select-item/select-item.module';
import { StatusSelectPopupModule } from './status-select-popup/status-select-popup.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TrackingLogChangePopupModule } from './tracking-log-change-popup/tracking-log-change-popup.module';
import { UserIconListModule } from './user-icon-list/user-icon-list.module';
import { UserIconModule } from './user-icon/user-icon.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    PopupModule,
    NavigationModule,
    StatusSelectPopupModule,
    InputTimeModule,
    TrackingLogChangePopupModule,
    ColorIconModule,
    SelectItemModule,
    ProjectBoardSelectPopupModule,
    TooltipModule,
    ColorSelectPopupModule,
    UserIconModule,
    UserIconListModule,
  ],
})
export class SharedUiModule {}
