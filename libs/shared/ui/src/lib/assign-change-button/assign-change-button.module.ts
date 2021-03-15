import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { UserIconListModule } from '../user-icon-list/user-icon-list.module';
import { UserSelectPopupModule } from '../user-select-popup/user-select-popup.module';
import { AssignChangeButtonComponent } from './assign-change-button.component';

@NgModule({
  declarations: [AssignChangeButtonComponent],
  imports: [
    CommonModule,
    UserSelectPopupModule,
    UserIconListModule,
    IconModule,
    TooltipModule,
  ],
  exports: [AssignChangeButtonComponent],
})
export class AssignChangeButtonModule {}
