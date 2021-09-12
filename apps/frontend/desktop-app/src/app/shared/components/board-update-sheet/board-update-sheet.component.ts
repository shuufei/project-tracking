import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
  IUpdateBoardUsecase,
  UPDATE_BOARD_USECASE,
} from '@bison/frontend/application';
import { Board } from '@bison/shared/domain';
import { UpdateBoardInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { merge, Subject } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { convertToApiTaskTypeFromDomainTaskType } from '../../../util/convert-to-api-task-type-from-domain-task-type';
import { convertToDomainBoardFromApiBoard } from '../../../util/convert-to-domain-board-from-api-board';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import {
  BOARD_FIELDS,
  BOARD_FRAGMENT_NAME,
} from '../../fragments/board-fragment';
import { ChangedPropertyEvent } from '../board-property-edit-form/board-property-edit-form.component';

type State = {
  boardId?: Board['id'];
  board?: Board;
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
  @Input() set boardId(value: Board['id']) {
    this.state.set('boardId', () => value);
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
    private updateBoardUsecase: IUpdateBoardUsecase,
    @Inject(APOLLO_DATA_QUERY)
    private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({ isSheetOpen: false });
  }

  ngOnInit(): void {
    this.state.connect(
      'board',
      this.state.select('boardId').pipe(
        nonNullable(),
        switchMap((id) => {
          return this.apolloDataQuery.queryBoard(
            { fields: BOARD_FIELDS, name: BOARD_FRAGMENT_NAME },
            id
          );
        }),
        map((response) => response?.data?.board),
        nonNullable(),
        map((board) => {
          return convertToDomainBoardFromApiBoard(board);
        })
      )
    );
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
    this.state.set('isSheetOpen', () => false);
    return merge(
      this.updateBoardUsecase.execute(input),
      this.notificationsService.show('ボード情報を更新しました', {
        hasCloseButton: true,
      })
    );
  }
}
