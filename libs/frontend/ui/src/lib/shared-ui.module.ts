import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdjustButtonModule } from './adjust-button/adjust-button.module';
import { AssignChangeButtonModule } from './assign-change-button/assign-change-button.module';
import { BoardItemModule } from './board-item/board-item.module';
import { BoardSelectPopupModule } from './board-select-popup/board-select-popup.module';
import { ButtonModule } from './button/button.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { ColorIconModule } from './color-icon/color-icon.module';
import { ColorSelectPopupModule } from './color-select-popup/color-select-popup.module';
import { DialogModule } from './dialog/dialog.module';
import { HeaderModule } from './header/header.module';
import { IconModule } from './icon/icon.module';
import { InputTimeModule } from './input-time/input-time.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MultiUserSelectPopupModule } from './multi-user-select-popup/multi-user-select-popup.module';
import { NavigationModule } from './navigation/navigation.module';
import { PlannedTimeControllerModule } from './planned-time-controller/planned-time-controller.module';
import { PopupModule } from './popup/popup.module';
import { ProjectBoardSelectPopupModule } from './project-board-select-popup/project-board-select-popup.module';
import { ProjectCardModule } from './project-card/project-card.module';
import { ProjectNavigationModule } from './project-navigation/project-navigation.module';
import { SelectItemModule } from './select-item/select-item.module';
import { SheetFooterModule } from './sheet-footer/sheet-footer.module';
import { SheetModule } from './sheet/sheet.module';
import { StatusChangeButtonModule } from './status-change-button/status-change-button.module';
import { StatusSelectPopupModule } from './status-select-popup/status-select-popup.module';
import { SubtaskModule } from './subtask/subtask.module';
import { TaskCardModule } from './task-card/task-card.module';
import { TextFieldModule } from './text-field/text-field.module';
import { TextareaModule } from './textarea/textarea.module';
import { TimeLabelModule } from './time-label/time-label.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { TrackingLogChangeButtonModule } from './tracking-log-change-button/tracking-log-change-button.module';
import { TrackingLogChangePopupModule } from './tracking-log-change-popup/tracking-log-change-popup.module';
import { UserIconListModule } from './user-icon-list/user-icon-list.module';
import { UserIconModule } from './user-icon/user-icon.module';
import { UserSelectPopupModule } from './user-select-popup/user-select-popup.module';

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
    TextFieldModule,
    UserSelectPopupModule,
    SubtaskModule,
    TimeLabelModule,
    CheckboxModule,
    TaskCardModule,
    TrackingLogChangeButtonModule,
    StatusChangeButtonModule,
    AssignChangeButtonModule,
    MenuItemModule,
    BoardItemModule,
    ProjectCardModule,
    ProjectNavigationModule,
    HeaderModule,
    SheetModule,
    TextareaModule,
    SheetFooterModule,
    DialogModule,
    BoardSelectPopupModule,
    MultiUserSelectPopupModule,
    AdjustButtonModule,
    PlannedTimeControllerModule,
  ],
})
export class SharedUiModule {}
