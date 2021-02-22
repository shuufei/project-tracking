import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';

@NgModule({
  imports: [CommonModule, ButtonModule],
})
export class SharedUiModule {}
