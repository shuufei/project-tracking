import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-menu-popup',
  templateUrl: './menu-popup.component.html',
  styleUrls: ['./menu-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPopupComponent {
  @Input() isTaskCardHover = false;
  @Output() clickedEdit = new EventEmitter<void>();
  @Output() clickedAddSubtask = new EventEmitter<void>();
  @Output() clickedEditPlannedTime = new EventEmitter<void>();
  @Output() clickedMoveBoard = new EventEmitter<void>();
  @Output() clickedDelete = new EventEmitter<void>();
}
