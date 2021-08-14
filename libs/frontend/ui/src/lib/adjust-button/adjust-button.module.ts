import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { AdjustButtonComponent } from './adjust-button.component';

@NgModule({
  declarations: [AdjustButtonComponent],
  imports: [CommonModule, ButtonModule],
  exports: [AdjustButtonComponent],
})
export class AdjustButtonModule {}
