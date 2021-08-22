import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { IconModule } from '../icon/icon.module';
import { TextFieldModule } from '../text-field/text-field.module';
import { TimeLabelModule } from '../time-label/time-label.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TrackingLogChangeButtonModule } from '../tracking-log-change-button/tracking-log-change-button.module';
import { SubtaskComponent } from './subtask.component';

const MAPPER: Record<string, string> = {
  tuiIconCheck: 'check',
};
export function iconsPath(name: string): string {
  return `assets/feather-sprite.svg#${MAPPER[name]}`;
}

@NgModule({
  declarations: [SubtaskComponent],
  imports: [
    CommonModule,
    TextFieldModule,
    IconModule,
    CheckboxModule,
    TimeLabelModule,
    TextFieldModule,
    TrackingLogChangeButtonModule,
    TooltipModule,
  ],
  exports: [SubtaskComponent],
})
export class SubtaskModule {}
