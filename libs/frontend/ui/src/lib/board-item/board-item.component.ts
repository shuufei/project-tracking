import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'ui-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardItemComponent {
  @Input() boardName = '';
  @Input() date?: Date;
  @Input() clickedEdit = new EventEmitter();
  @Input() clickedDelete = new EventEmitter();
}
