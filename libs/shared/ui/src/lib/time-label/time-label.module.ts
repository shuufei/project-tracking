import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeLabelComponent } from './time-label.component';

@NgModule({
  declarations: [TimeLabelComponent],
  imports: [CommonModule],
  exports: [TimeLabelComponent],
})
export class TimeLabelModule {}
