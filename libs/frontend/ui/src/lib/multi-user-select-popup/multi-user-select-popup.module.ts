import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupModule } from '../popup/popup.module';
import { SelectItemModule } from '../select-item/select-item.module';
import { TextFieldModule } from '../text-field/text-field.module';
import { UserIconModule } from '../user-icon/user-icon.module';
import { MultiUserSelectPopupComponent } from './multi-user-select-popup.component';

@NgModule({
  declarations: [MultiUserSelectPopupComponent],
  imports: [
    CommonModule,
    PopupModule,
    UserIconModule,
    SelectItemModule,
    TextFieldModule,
  ],
  exports: [MultiUserSelectPopupComponent],
})
export class MultiUserSelectPopupModule {}
