import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { PopupModule } from '../popup/popup.module';
import { SelectItemModule } from '../select-item/select-item.module';
import { StatusSelectPopupComponent } from './status-select-popup.component';

@NgModule({
  declarations: [StatusSelectPopupComponent],
  imports: [CommonModule, PopupModule, IconModule, SelectItemModule],
  exports: [StatusSelectPopupComponent],
})
export class StatusSelectPopupModule {}
