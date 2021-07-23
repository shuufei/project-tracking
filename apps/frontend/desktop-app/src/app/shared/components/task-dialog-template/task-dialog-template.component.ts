import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'bis-task-dialog-template',
  templateUrl: './task-dialog-template.component.html',
  styleUrls: ['./task-dialog-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogTemplateComponent {
  @Output() clickedCloseButton = new EventEmitter<void>();
}
