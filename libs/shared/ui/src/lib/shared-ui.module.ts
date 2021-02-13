import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsComponent } from './colors/colors.component';
import { TypographyComponent } from './typography/typography.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ColorsComponent, TypographyComponent],
})
export class SharedUiModule {}
