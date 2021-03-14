import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { IconName } from '../../../icon/icon.component';
import type { Color } from '../../../types';

@Component({
  selector: 'ui-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  @Input() icon?: IconName;
  @Input() itemName = '';
  @Input() color: Color = 'basic';
}
