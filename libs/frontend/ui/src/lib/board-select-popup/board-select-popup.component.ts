import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';

type State = {
  boards: Board[];
  selectedBoardId?: Board['id'];
};

@Component({
  selector: 'ui-board-select-popup',
  templateUrl: './board-select-popup.component.html',
  styleUrls: ['./board-select-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardSelectPopupComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  isOpened$: Observable<boolean> = new Subject<boolean>().asObservable();
  @Input()
  set boards(value: Board[]) {
    this.state.set('boards', () => value);
  }
  @Input()
  set selectedBoardId(value: Board['id']) {
    this.state.set('selectedBoardId', () => value);
  }
  @Output() selectBoard = new EventEmitter<Board['id']>();

  readonly state$ = this.state.select();

  readonly onClickedBoard$ = new Subject<Board['id']>();

  constructor(private state: RxState<State>) {
    this.state.set({
      boards: [],
    });
  }

  ngOnInit(): void {
    this.state.connect(this.onClickedBoard$, (state, boardId) => ({
      ...state,
      selectedBoardId: boardId,
    }));
    this.state.hold(this.state.select('selectedBoardId'), (id) => {
      this.selectBoard.emit(id);
    });
  }
}

export type Board = {
  id: string;
  name: string;
};
