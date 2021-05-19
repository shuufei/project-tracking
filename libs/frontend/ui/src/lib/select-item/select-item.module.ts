import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/icon.module';
import { SelectItemComponent } from './select-item.component';

@NgModule({
  declarations: [SelectItemComponent],
  imports: [CommonModule, IconModule],
  exports: [SelectItemComponent],
})
export class SelectItemModule {}
