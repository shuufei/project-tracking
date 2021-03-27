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
  @Input() featureOption: MenuPopupFeatureOption = {};
  @Input() triggerVisible = false;
  @Output() clickedEdit = new EventEmitter<void>();
  @Output() clickedAddSubtask = new EventEmitter<void>();
  @Output() clickedEditPlannedTime = new EventEmitter<void>();
  @Output() clickedMoveBoard = new EventEmitter<void>();
  @Output() clickedDelete = new EventEmitter<void>();
}

export type MenuPopupFeatureOption = {
  edit?: boolean;
  addSubtask?: boolean;
  editPlannedTime?: boolean;
  moveBoard?: boolean;
  delete?: boolean;
};
