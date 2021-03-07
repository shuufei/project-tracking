import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-user-icon-list',
  templateUrl: './user-icon-list.component.html',
  styleUrls: ['./user-icon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIconListComponent {
  @Input() srcList: (string | undefined)[] = [];
  @Input() size = 35;
}
