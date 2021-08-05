import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Board } from '@bison/frontend/ui';
import { RxState } from '@rx-angular/state';
import { combineLatest, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type State = {
  boards: Board[];
  selectedBoardId?: Board['id'];
};

@Component({
  selector: 'bis-task-dialog-board-change-button',
  templateUrl: './task-dialog-board-change-button.component.html',
  styleUrls: ['./task-dialog-board-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogBoardChangeButtonComponent implements OnInit {
  @Input() set boards(value: State['boards']) {
    this.state.set('boards', () => value);
  }
  @Input() set selectedBoardId(value: Board['id']) {
    this.state.set('selectedBoardId', () => value);
  }
  @Output() selectedBoard = new EventEmitter<Board['id']>();

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly selectedBoard$ = combineLatest([
    this.state.select('boards'),
    this.state.select('selectedBoardId'),
  ]).pipe(
    map(([boards, selectedBoardId]) => {
      return boards.find((v) => v.id === selectedBoardId);
    }),
    filter((v): v is NonNullable<typeof v> => v != null)
  );

  /**
   * Event
   */
  readonly onChangedSelectedBoardId$ = new Subject<State['selectedBoardId']>();

  constructor(private state: RxState<State>) {
    this.state.set({ boards: [] });
  }

  ngOnInit(): void {
    this.state.connect('selectedBoardId', this.onChangedSelectedBoardId$);
    this.state.hold(this.state.select('selectedBoardId'), (id) => {
      this.selectedBoard.emit(id);
    });
  }
}
