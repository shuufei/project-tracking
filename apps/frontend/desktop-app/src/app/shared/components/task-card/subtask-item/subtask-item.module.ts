import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubtaskModule } from '@bison/frontend/ui';
import { SubtaskFacadeModule } from '../../../facade/subtask-facade/subtask-facade.module';
import { SubtaskItemComponent } from './subtask-item.component';

@NgModule({
  declarations: [SubtaskItemComponent],
  imports: [CommonModule, SubtaskFacadeModule, SubtaskModule],
  exports: [SubtaskItemComponent],
})
export class SubtaskItemModule {}
