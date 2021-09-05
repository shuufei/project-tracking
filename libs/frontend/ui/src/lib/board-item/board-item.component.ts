import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
  @Output() clickedEdit = new EventEmitter();
  @Output() clickedDelete = new EventEmitter();
}
