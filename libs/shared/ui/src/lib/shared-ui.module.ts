import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';
import { ShadowComponent } from './shadow/shadow.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ColorsComponent, TypographyComponent, ShadowComponent],
})
export class SharedUiModule {}
