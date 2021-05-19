import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupModule } from '../popup/popup.module';
import { SelectItemModule } from '../select-item/select-item.module';
import { TextFieldModule } from '../text-field/text-field.module';
import { UserIconModule } from '../user-icon/user-icon.module';
import { UserSelectPopupComponent } from './user-select-popup.component';

@NgModule({
  declarations: [UserSelectPopupComponent],
  imports: [
    CommonModule,
    PopupModule,
    UserIconModule,
    SelectItemModule,
    TextFieldModule,
  ],
  exports: [UserSelectPopupComponent],
})
export class UserSelectPopupModule {}
