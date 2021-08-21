import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { PopupModule } from '../popup/popup.module';
import { DeleteConfirmPopupComponent } from './delete-confirm-popup.component';

@NgModule({
  declarations: [DeleteConfirmPopupComponent],
  imports: [CommonModule, PopupModule, ButtonModule, IconModule],
  exports: [DeleteConfirmPopupComponent],
})
export class DeleteConfirmPopupModule {}
