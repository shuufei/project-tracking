import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalenderComponent } from './calender.component';

@NgModule({
  declarations: [CalenderComponent],
  imports: [
    CommonModule
  ],
  exports: [CalenderComponent]
})
export class CalenderModule { }
