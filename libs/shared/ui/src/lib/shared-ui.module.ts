import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { IconModule } from './icon/icon.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, NavigationModule,],
})
export class SharedUiModule { }
