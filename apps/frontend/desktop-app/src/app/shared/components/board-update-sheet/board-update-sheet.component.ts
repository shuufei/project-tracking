import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  IUpdateBoardUsecase,
  UPDATE_BOARD_USECASE,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { Board } from '@bison/shared/domain';
import { UpdateBoardInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { convertToApiTaskTypeFromDomainTaskType } from '../../../util/convert-to-api-task-type-from-domain-task-type';
import { ChangedPropertyEvent } from '../board-property-edit-form/board-property-edit-form.component';

type State = {
  board?: Board;
  project?: Project;
  isSheetOpen: boolean;
};

@Component({
  selector: 'bis-board-update-sheet',
  templateUrl: './board-update-sheet.component.html',
  styleUrls: ['./board-update-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardUpdateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() set board(value: Board) {
    this.state.set('board', () => value);
  }
  @Input() set project(value: Project) {
    this.state.set('project', () => value);
  }
  @Input() isOpened$ = new Subject<boolean>().asObservable();

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isSheetOpen$ = this.state.select('isSheetOpen');

  /**
   * Event
   */
  readonly onChangedBoardProperty$ = new Subject<ChangedPropertyEvent>();
  readonly onClickedUpdate$ = new Subject<void>();
  readonly onOpenedSheet$ = new Subject<void>();
  readonly onClosedeSheet$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    @Inject(UPDATE_BOARD_USECASE)
    private updateBoardUsecase: IUpdateBoardUsecase
  ) {}

  ngOnInit(): void {
    this.state.set({ isSheetOpen: false });
    this.state.connect('isSheetOpen', this.isOpened$);
    this.state.connect(this.onChangedBoardProperty$, (state, event) => {
      if (state.board == null) {
        return state;
      }
      return {
        ...state,
        board: {
          ...state.board,
          name: event.name,
          description: event.description,
        },
      };
    });
    this.state.connect('isSheetOpen', this.onOpenedSheet$, () => true);
    this.state.connect('isSheetOpen', this.onClosedeSheet$, () => false);
    this.state.hold(
      this.onClickedUpdate$.pipe(
        exhaustMap(() => this.mutateUpateBoard$(this.state.get()))
      )
    );
  }

  private mutateUpateBoard$(state: State) {
    if (state.project == null) {
      throw new Error('project is undefifned');
    }
    if (state.board == null) {
      throw new Error('board is undefined');
    }
    const input: UpdateBoardInput = {
      id: state.board.id,
      name: state.board.name,
      description: state.board.description,
      projectId: state.board.projectId,
      tasksOrder: state.board.tasksOrder.map((v) => ({
        taskId: v.taskId,
        type: convertToApiTaskTypeFromDomainTaskType(v.type),
      })),
    };
    return this.updateBoardUsecase.execute(input).pipe(
      switchMap(() => {
        this.state.set('isSheetOpen', () => false);
        return this.notificationsService.show('ボードが更新されました', {
          hasCloseButton: true,
        });
      })
    );
  }
}
