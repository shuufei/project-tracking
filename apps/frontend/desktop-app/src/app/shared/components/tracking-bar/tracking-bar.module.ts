import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  IconModule,
  TooltipModule,
  TrackingLogChangeButtonModule,
} from '@bison/frontend/ui';
import { TrackingBarComponent } from './tracking-bar.component';

@NgModule({
  declarations: [TrackingBarComponent],
  imports: [
    CommonModule,
    TrackingLogChangeButtonModule,
    IconModule,
    TooltipModule,
  ],
  exports: [TrackingBarComponent],
})
export class TrackingBarModule {}
