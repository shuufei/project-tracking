import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Color } from '../types';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() size: IconSize = 'm';
  @Input() icon!: IconName;
  @Input() color: Color = 'basic';
}

export type IconSize = 'm' | 's';
export type IconName =
  | 'arrow-down'
  | 'arrow-up'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevrons-down'
  | 'chevrons-up'
  | 'chevrons-left'
  | 'chevrons-right'
  | 'columns'
  | 'more-horizontal'
  | 'more-vertical'
  | 'pause'
  | 'play'
  | 'user'
  | 'calendar';
