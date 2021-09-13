import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
import { SubtaskModule } from '@bison/frontend/ui';
import { SubtaskFacadeModule } from '../../../facade/subtask-facade/subtask-facade.module';
import { SubtaskItemComponent } from './subtask-item.component';

@NgModule({
  declarations: [SubtaskItemComponent],
  imports: [CommonModule, SubtaskFacadeModule, SubtaskModule],
  exports: [SubtaskItemComponent],
  providers: [{ provide: APOLLO_DATA_QUERY, useClass: ApolloDataQuery }],
})
export class SubtaskItemModule {}
