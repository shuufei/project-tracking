import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { IconModule } from './icon/icon.module';
import { InputTimeModule } from './input-time/input-time.module';
import { NavigationModule } from './navigation/navigation.module';
import { PopupModule } from './popup/popup.module';
import { StatusSelectPopupModule } from './status-select-popup/status-select-popup.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    PopupModule,
    NavigationModule,
    StatusSelectPopupModule,
    InputTimeModule,
  ],
})
export class SharedUiModule {}
