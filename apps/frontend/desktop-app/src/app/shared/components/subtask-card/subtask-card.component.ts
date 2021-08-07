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
import {
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  pairwise,
  startWith,
} from 'rxjs/operators';

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
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();

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
        filter((isDone) => {
          return isDone !== this.state.get('subtask')?.isDone;
        }),
        exhaustMap((isDone) => {
          return this.updateIsDone(isDone);
        })
      )
    );
    // TODO: taskと同じ処理になるので共通化する
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        startWith(this.state.get('subtask')?.workTimeSec ?? 0),
        pairwise(),
        filter(([prev, sec]) => {
          const diff = sec - prev;
          const isChangedByCtrlBtn = diff > 1;
          const isTracking =
            this.state.get('subtask')?.workStartDateTimestamp != null;
          return isChangedByCtrlBtn || !isTracking;
        }),
        map(([, current]) => current),
        filter((sec) => {
          return sec !== this.state.get('subtask')?.workTimeSec;
        }),
        exhaustMap((sec) => {
          return this.updateWorkTimeSec(sec);
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        filter((sec) => {
          return sec !== this.state.get('subtask')?.scheduledTimeSec;
        }),
        exhaustMap((sec) => {
          return this.updateScheduledTimeSec(sec);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        exhaustMap(() => {
          return this.startTracking();
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        exhaustMap(() => {
          return this.stopTracking();
        })
      )
    );

    /**
     * TODO:
     *   - 削除処理
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
    this.state.set('subtask', ({ subtask }) => {
      return subtask == null
        ? subtask
        : {
            ...subtask,
            isDone,
          };
    });
    return this.updateSubtaskUsecase.execute({
      ...input,
      isDone,
    });
  }

  private updateWorkTimeSec(sec: Subtask['workTimeSec']) {
    const workStartDateTimestamp =
      this.state.get('subtask')?.workStartDateTimestamp && new Date().valueOf();
    const input = this.generateUpdateInputBase();
    if (input == null) return of(undefined);
    this.state.set('subtask', (state) => {
      const subtask = state.subtask;
      return subtask == null
        ? subtask
        : {
            ...subtask,
            workTimeSec: sec,
            workStartDateTimestamp,
          };
    });
    return this.updateSubtaskUsecase.execute({
      ...input,
      workTimeSec: sec,
      workStartDateTimestamp,
    });
  }

  private updateScheduledTimeSec(sec: Subtask['scheduledTimeSec']) {
    const input = this.generateUpdateInputBase();
    if (input == null) return of(undefined);
    this.state.set('subtask', (state) => {
      const subtask = state.subtask;
      return subtask == null
        ? subtask
        : {
            ...subtask,
            scheduledTimeSec: sec,
          };
    });
    return this.updateSubtaskUsecase.execute({
      ...input,
      scheduledTimeSec: sec,
    });
  }

  private startTracking() {
    const now = new Date().valueOf();
    const input = this.generateUpdateInputBase();
    if (input == null) return of(undefined);
    this.state.set('subtask', (state) => {
      const subtask = state.subtask;
      return subtask == null
        ? subtask
        : {
            ...subtask,
            workStartDateTimestamp: now,
          };
    });
    return this.updateSubtaskUsecase.execute({
      ...input,
      workStartDateTimestamp: now,
    });
  }

  private stopTracking() {
    const start = this.state.get('subtask')?.workStartDateTimestamp;
    const currentWorkTimeSec = this.state.get('subtask')?.workTimeSec;
    if (start == null || currentWorkTimeSec == null) return of(undefined);
    const now = new Date().valueOf();
    const diffTimeMilliSec = now - start;
    const updatedWorkTimeSec =
      currentWorkTimeSec + Math.ceil(diffTimeMilliSec / 1000);
    const input = this.generateUpdateInputBase();
    if (input == null) return of(undefined);
    this.state.set('subtask', (state) => {
      const subtask = state.subtask;
      return subtask == null
        ? subtask
        : {
            ...subtask,
            workTimeSec: updatedWorkTimeSec,
            workStartDateTimestamp: undefined,
          };
    });
    return this.updateSubtaskUsecase.execute({
      ...input,
      workTimeSec: updatedWorkTimeSec,
      workStartDateTimestamp: undefined,
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
