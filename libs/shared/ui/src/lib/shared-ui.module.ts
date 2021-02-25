import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button/button.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [CommonModule, ButtonModule, NavigationModule],
})
export class SharedUiModule { }
