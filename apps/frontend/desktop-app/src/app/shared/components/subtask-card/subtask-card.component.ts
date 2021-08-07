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
  IUpdateSubtaskUsecase,
  UPDATE_SUBTASK_USECASE,
} from '@bison/frontend/application';
import { Subtask } from '@bison/frontend/domain';
import { User } from '@bison/shared/domain';
import { UpdateSubtaskInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import { distinctUntilChanged, exhaustMap, filter, map } from 'rxjs/operators';

const USER_FIELDS = gql`
  fragment UserPartsInSubtaskCard on User {
    id
    name
    icon
  }
`;

type State = {
  subtask?: Subtask;
  users: User[];
};

@Component({
  selector: 'bis-subtask-card',
  templateUrl: './subtask-card.component.html',
  styleUrls: ['./subtask-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SubtaskCardComponent implements OnInit {
  @Input()
  set subtask(value: State['subtask']) {
    this.state.set('subtask', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onChangedCheck$ = new Subject<boolean>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    @Inject(UPDATE_SUBTASK_USECASE)
    private updateSubtaskUsecase: IUpdateSubtaskUsecase
  ) {
    this.state.set({ users: [] });
  }

  ngOnInit(): void {
    this.state.connect(
      'subtask',
      this.onChangedWorkTimeSec$,
      (state, workTimeSec) => {
        if (state.subtask == null) {
          return state.subtask;
        }
        return {
          ...state.subtask,
          workTimeSec,
        };
      }
    );
    this.state.connect(
      'subtask',
      this.onChangedScheduledTimeSec$,
      (state, scheduledTimeSec) => {
        if (state.subtask == null) {
          return state.subtask;
        }
        return {
          ...state.subtask,
          scheduledTimeSec,
        };
      }
    );
    this.state.connect('subtask', this.onChangedCheck$, (state, checked) => {
      if (state.subtask == null) {
        return state.subtask;
      }
      return {
        ...state.subtask,
        isDone: checked,
      };
    });
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers(
          { name: 'UserPartsInSubtaskCard', fields: USER_FIELDS },
          { fetchPolicy: 'cache-only' }
        )
        .pipe(
          map((response) => {
            if (response.data?.users == null) {
              return [];
            }
            const { users } = response.data;
            return users.map((user) => {
              return {
                id: user.id,
                name: user.name,
                icon: user.icon,
              };
            });
          })
        )
    );

    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter(
          (userId) => userId !== this.state.get('subtask')?.assignUser?.id
        ),
        exhaustMap((userId) => {
          return this.updateAssignUser(userId);
        })
      )
    );
    this.state.hold(
      this.state.select('subtask').pipe(
        map((subtask) => subtask?.isDone),
        filter((v): v is NonNullable<typeof v> => v != null),
        distinctUntilChanged(),
        exhaustMap((isDone) => {
          return this.updateIsDone(isDone);
        })
      )
    );

    /**
     * TODO:
     *   - 削除処理
     *   - 更新処理(shceudledTimeSec, workTimeSec, isTracking)
     */
  }

  private updateAssignUser(userId?: User['id']) {
    const subtask = this.state.get('subtask');
    if (subtask == null) return of(undefined);
    const input = this.generateUpdateInputBase();
    if (input == null) return of(undefined);
    return this.updateSubtaskUsecase.execute({
      ...input,
      assignUserId: userId,
    });
  }

  private updateIsDone(isDone: Subtask['isDone']) {
    const input = this.generateUpdateInputBase();
    if (input == null) return of(undefined);
    return this.updateSubtaskUsecase.execute({
      ...input,
      isDone,
    });
  }

  private generateUpdateInputBase() {
    const subtask = this.state.get('subtask');
    if (subtask == null) return;
    const input: UpdateSubtaskInput = {
      id: subtask.id,
      title: subtask.title,
      description: subtask.description,
      isDone: subtask.isDone,
      assignUserId: subtask.assignUser?.id,
      workTimeSec: subtask.workTimeSec,
      scheduledTimeSec: subtask.scheduledTimeSec,
      workStartDateTimestamp: subtask.workStartDateTimestamp,
      taskId: subtask.taskId,
    };
    return input;
  }
}
