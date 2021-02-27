import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { IconModule } from './icon/icon.module';
import { NavigationModule } from './navigation/navigation.module';
import { PopupModule } from './popup/popup.module';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, PopupModule, NavigationModule],
})
export class SharedUiModule { }
