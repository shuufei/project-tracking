import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Color } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  projects: Project[];
  boards: Board[];
  selectedProjectId?: Project['id'];
  selectedBoardId?: Board['id'];
};

@Component({
  selector: 'ui-project-board-select-popup',
  templateUrl: './project-board-select-popup.component.html',
  styleUrls: ['./project-board-select-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectBoardSelectPopupComponent {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set projects(value: Project[]) {
    this.state.set('projects', () => value);
  }
  @Input()
  set boards(value: Board[]) {
    this.state.set('boards', () => value);
  }
  @Input()
  set selectedProjectId(value: Project['id']) {
    this.state.set('selectedProjectId', () => value);
  }
  @Input()
  set selectedBoardId(value: Board['id']) {
    this.state.set('selectedBoardId', () => value);
  }
  @Output() selectProject = new EventEmitter<Project['id']>();
  @Output() selectBoard = new EventEmitter<Board['id']>();

  // State
  readonly projects$ = this.state.select('projects');
  readonly boards$ = this.state.select('boards');
  readonly selectedProjectId$ = this.state.select('selectedProjectId');
  readonly selectedBoardId$ = this.state.select('selectedBoardId');

  // Events
  readonly onClickedProejct$ = new Subject<Project['id']>();
  readonly onClickedBoard$ = new Subject<Board['id']>();

  constructor(private state: RxState<State>) {
    this.state.connect(this.onClickedProejct$, (state, projectId) => ({
      ...state,
      selectedProjectId: projectId,
    }));
    this.state.connect(this.onClickedBoard$, (state, boardId) => ({
      ...state,
      selectedBoardId: boardId,
    }));
    this.state.hold(this.selectedProjectId$, (id) => {
      this.selectProject.emit(id);
    });
    this.state.hold(this.selectedBoardId$, (id) => {
      this.selectBoard.emit(id);
    });

    this.state.set({
      projects: [],
      boards: [],
    });
  }
}

export type Project = {
  id: string;
  name: string;
  color: Color;
};

export type Board = {
  id: string;
  name: string;
};
