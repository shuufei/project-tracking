import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorIconModule } from '../color-icon/color-icon.module';
import { PopupModule } from '../popup/popup.module';
import { SelectItemModule } from '../select-item/select-item.module';
import { ProjectBoardSelectPopupComponent } from './project-board-select-popup.component';

@NgModule({
  declarations: [ProjectBoardSelectPopupComponent],
  imports: [CommonModule, PopupModule, SelectItemModule, ColorIconModule],
  exports: [ProjectBoardSelectPopupComponent],
})
export class ProjectBoardSelectPopupModule {}
