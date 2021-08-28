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
  @Input() project?: Project;
  @Input() boards: Board[] = [];
  @Output() clickedCreateBoard = new EventEmitter();
  @Output() clickedDeleteProject = new EventEmitter<Project>();
  @Output() clickedEditBoard = new EventEmitter<Board>();
  @Output() clickedDeleteBoard = new EventEmitter<Board>();
  isOpen = false;
}

type Project = { id: string; name: string; color: Color };
type Board = { id: string; name: string };
