import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorIconModule } from '../color-icon/color-icon.module';
import { PopupModule } from '../popup/popup.module';
import { SelectItemModule } from '../select-item/select-item.module';
import { ColorSelectPopupComponent } from './color-select-popup.component';

@NgModule({
  imports: [CommonModule, PopupModule, SelectItemModule, ColorIconModule],
  declarations: [ColorSelectPopupComponent],
  exports: [ColorSelectPopupComponent],
})
export class ColorSelectPopupModule {}
