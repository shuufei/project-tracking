import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Color } from '@bison/frontend/ui';

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
  @Input() hoverColor?: Color;

  get src() {
    return `assets/feather-sprite.svg#${this.icon}`;
  }

  get hoverColorClass() {
    return this.hoverColor !== undefined ? `hover-${this.hoverColor}` : '';
  }
}

export type IconSize = 'm' | 's';

export const Icons = [
  'arrow-down',
  'arrow-up',
  'arrow-left',
  'arrow-right',
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'chevrons-down',
  'chevrons-up',
  'chevrons-left',
  'chevrons-right',
  'columns',
  'more-horizontal',
  'more-vertical',
  'pause',
  'play',
  'user',
  'calendar',
  'check',
  'x-circle',
  'plus',
  'minus',
  'search',
  'edit-2',
  'tag',
  'clock',
  'trash-2',
] as const;
export type IconName = typeof Icons[number];
