import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Color } from '@bison/shared/domain';

@Component({
  selector: 'ui-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectNavigationComponent {
  @Input() project?: { id: number; name: string; color: Color };
  @Input() boards: { id: number; name: string }[] = [];
  @Input() selectedProjectId?: number;
  @Input() selectedBoardId?: number;
  @Output() clickedProject = new EventEmitter<number>();
  @Output() clickedBoard = new EventEmitter<number>();
  @Output() clickedCreateBoard = new EventEmitter();
  @Output() clickedDeleteProject = new EventEmitter<number>();
  @Output() clickedEditBoard = new EventEmitter<number>();
  @Output() clickedDeleteBoard = new EventEmitter<number>();
  isOpen = false;
}
