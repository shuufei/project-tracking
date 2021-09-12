import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  CREATE_BOARD_USECASE,
  ICreateBoardUsecase,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { Board } from '@bison/shared/domain';
import { CreateBoardInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { merge, Subject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ChangedPropertyEvent } from '../board-property-edit-form/board-property-edit-form.component';

type State = {
  boardName: Board['name'];
  boardDescription: Board['description'];
  project?: Project;
  isSheetOpen: boolean;
};

@Component({
  selector: 'bis-board-create-sheet',
  templateUrl: './board-create-sheet.component.html',
  styleUrls: ['./board-create-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardCreateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set project(value: State['project']) {
    this.state.set('project', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isSheetOpen$ = this.state.select('isSheetOpen');

  /**
   * Event
   */
  readonly onChangedBoardProperty$ = new Subject<ChangedPropertyEvent>();
  readonly onClickedCreate$ = new Subject<void>();
  readonly onOpenedSheet$ = new Subject<void>();
  readonly onClosedeSheet$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(CREATE_BOARD_USECASE)
    private createBoardUsecase: ICreateBoardUsecase,
    @Inject(TuiNotificationsService)
    private readonly notificationsServicce: TuiNotificationsService
  ) {}

  ngOnInit(): void {
    this.state.set({
      isSheetOpen: false,
    });
    this.state.connect(this.onChangedBoardProperty$, (state, event) => {
      return {
        ...state,
        boardName: event.name,
        boardDescription: event.description,
      };
    });
    this.state.connect('isSheetOpen', this.onOpenedSheet$, () => true);
    this.state.connect(this.onClosedeSheet$, () => {
      return {
        boardName: '',
        boardDescription: '',
        isSheetOpen: false,
      };
    });
    this.state.hold(
      this.onClickedCreate$.pipe(
        exhaustMap(() => this.mutateCreateBoard$(this.state.get()))
      )
    );
  }

  private mutateCreateBoard$(state: State) {
    if (state.project == null) {
      throw new Error('project is undefined');
    }
    const input: CreateBoardInput = {
      name: state.boardName,
      description: state.boardDescription,
      projectId: state.project.id,
    };
    this.state.set('isSheetOpen', () => false);
    return merge(
      this.createBoardUsecase.execute(input),
      this.notificationsServicce.show('ボードが作成されました', {
        hasCloseButton: true,
      })
    );
  }
}
