import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import type { Color } from '@bison/shared/domain';
import { COLOR } from '@bison/shared/domain';

@Component({
  selector: 'ui-nav-project-item',
  templateUrl: './nav-project-item.component.html',
  styleUrls: ['./nav-project-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavProjectItemComponent {
  @Input() isOpen = false;
  @Input() projectName = '';
  @Input() color: Color = COLOR.Gray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() routerLinkPath: any;
  @Output() clickedOpenToggle = new EventEmitter();
  @Output() clickedDelete = new EventEmitter();
}
