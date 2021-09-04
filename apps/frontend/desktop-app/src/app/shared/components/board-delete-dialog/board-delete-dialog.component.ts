import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  DELETE_BOARD_USECASE,
  IDeleteBoardUsecase,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { Board } from '@bison/shared/domain';
import { DeleteBoardInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { exhaustMap, switchMap } from 'rxjs/operators';

type State = {
  project?: Project;
  board?: Board;
  isOpen: boolean;
};

@Component({
  selector: 'bis-board-delete-dialog',
  templateUrl: './board-delete-dialog.component.html',
  styleUrls: ['./board-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardDeleteDialogComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set project(value: Project) {
    this.state.set('project', () => value);
  }
  @Input()
  set board(value: Board) {
    this.state.set('board', () => value);
  }
  @Input() isOpened$ = new Subject<boolean>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  readonly state$ = this.state.select();
  readonly isOpenDialog$ = this.state.select('isOpen');

  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onOpenedDialog$ = new Subject<void>();
  readonly onClosedDialog$ = new Subject<void>();
  readonly onClickedDeleteButton$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(DELETE_BOARD_USECASE)
    private deleteBoardUsecase: IDeleteBoardUsecase,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {}

  ngOnInit(): void {
    this.state.set({
      isOpen: false,
    });
    this.state.connect('isOpen', this.isOpened$);
    this.state.connect('isOpen', this.onOpenedDialog$, () => true);
    this.state.connect('isOpen', this.onClosedDialog$, () => false);
    this.state.hold(this.isOpenDialog$, (isOpen) => {
      isOpen ? this.opened.emit() : this.closed.emit();
    });
    this.state.connect('isOpen', this.onClickedCloseButton$, () => false);
    this.state.hold(
      this.onClickedDeleteButton$.pipe(
        exhaustMap(() => {
          return this.deleteBoard(this.state.get());
        })
      )
    );
  }

  private deleteBoard(state: State) {
    if (state.board == null) {
      throw new Error('board is undefined');
    }
    const input: DeleteBoardInput = {
      id: state.board.id,
    };
    return this.deleteBoardUsecase.execute(input).pipe(
      switchMap(() => {
        this.state.set('isOpen', () => false);
        return this.notificationsService.show('ボードを削除しました', {
          hasCloseButton: true,
        });
      })
    );
  }
}
