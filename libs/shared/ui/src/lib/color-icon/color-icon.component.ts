import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import type { Color } from '@bison/shared/domain';
import { COLOR } from '../../constants/color';

@Component({
  selector: 'ui-color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorIconComponent {
  @Input() color: Color = 'gray';
  @HostBinding('style.backgroundColor') get backgroundColor() {
    return COLOR[this.color];
  }
}
