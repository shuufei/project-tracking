import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-nav-board-item',
  templateUrl: './nav-board-item.component.html',
  styleUrls: ['./nav-board-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBoardItemComponent {
  @Input() isSelected = false;
  @Input() boardName = '';
  @Output() clickedEdit = new EventEmitter();
  @Output() clickedDelete = new EventEmitter();
}
