import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon/icon.module';
import { BackButtonComponent } from './back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [CommonModule, RouterModule, IconModule],
  exports: [BackButtonComponent],
})
export class BackButtonModule {}
