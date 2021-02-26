import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { IconModule } from './icon/icon.module';
import { PopupModule } from './popup/popup.module';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, PopupModule],
})
export class SharedUiModule {}
