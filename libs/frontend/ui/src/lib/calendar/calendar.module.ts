import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiCalendarModule } from '@taiga-ui/core';
import { TUI_LANGUAGE } from '@taiga-ui/i18n';
import { of } from 'rxjs';
import { CalendarComponent } from './calendar.component';
import { TUI_JAPANESE_LANGUAGE } from './calender.i18n';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    TuiCalendarModule,
  ],
  providers: [
    { provide: TUI_LANGUAGE, useValue: of(TUI_JAPANESE_LANGUAGE) },
  ],
  exports: [CalendarComponent]
})
export class CalendarModule { }
