import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { StatusSelectPopupModule } from '../status-select-popup/status-select-popup.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { StatusChangeButtonComponent } from './status-change-button.component';

@NgModule({
  declarations: [StatusChangeButtonComponent],
  imports: [CommonModule, StatusSelectPopupModule, IconModule, TooltipModule],
  exports: [StatusChangeButtonComponent],
})
export class StatusChangeButtonModule {}
