import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, IconModule, PopupModule } from '@bison/frontend/ui';
import { DeleteConfirmPopupComponent } from './delete-confirm-popup.component';

@NgModule({
  declarations: [DeleteConfirmPopupComponent],
  imports: [CommonModule, PopupModule, ButtonModule, IconModule],
  exports: [DeleteConfirmPopupComponent],
})
export class DeleteConfirmPopupModule {}
