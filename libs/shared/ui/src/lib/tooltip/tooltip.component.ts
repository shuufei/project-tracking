import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: '[uiTooltip]',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  @Input() uiTooltip = '';
  @Input() uiTooltipDirection: Direction = 'bottom-left';
}

export type Direction =
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right';
