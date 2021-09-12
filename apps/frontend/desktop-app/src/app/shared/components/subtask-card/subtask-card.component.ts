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
} from '@bison/frontend/application';
import { Subtask } from '@bison/frontend/domain';
import { User } from '@bison/shared/domain';
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
  switchMap,
  tap,
} from 'rxjs/operators';
import { convertToDomainSubtaskFromApiSubtask } from '../../../util/convert-to-domain-subtask-from-api-subtask';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import { updateStateOnPause } from '../../../util/custom-operators/state-updators/update-state-on-pause';
import { SubtaskFacadeService } from '../../facade/subtask-facade/subtask-facade.service';
import {
  SUBTASK_FIELDS,
  SUBTASK_FRAGMENT_NAME,
} from '../../fragments/subtask-fragment';

const USER_FIELDS = gql`
  fragment UserPartsInSubtaskCard on User {
    id
    name
    icon
  }
`;

type State = {
  subtaskId?: Subtask['id'];
  subtask?: Subtask;
  users: User[];
  isOpenedDeletePopup: boolean;
  isEditableTitle: boolean;
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
  set subtaskId(value: Subtask['id']) {
    this.state.set('subtaskId', () => value);
  }
  @Input() set isTitleEditable(value: State['isEditableTitle']) {
    this.state.set('isEditableTitle', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenedDeletePopup$ = new Subject<boolean>();

  /**
   * Event
   */
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onChangedCheck$ = new Subject<boolean>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();
  readonly onDelete$ = new Subject<void>();
  readonly onSubmitTitle$ = new Subject<string>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private subtaskFacade: SubtaskFacadeService
  ) {
    this.state.set({ users: [], isOpenedDeletePopup: false });
  }

  ngOnInit(): void {
    this.state.connect(
      'subtask',
      this.state.select('subtaskId').pipe(
        nonNullable(),
        switchMap((subtaskId) => {
          return this.apolloDataQuery.querySubtask(
            { fields: SUBTASK_FIELDS, name: SUBTASK_FRAGMENT_NAME },
            subtaskId
          );
        }),
        map((response) => response.data.subtask),
        nonNullable(),
        map((subtask) => {
          return convertToDomainSubtaskFromApiSubtask(subtask);
        })
      )
    );
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
        filter((userId) => {
          return userId !== this.state.get('subtask')?.assignUser?.id;
        }),
        exhaustMap((userId) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateAssignUser(userId, subtask);
        })
      )
    );
    this.state.hold(
      this.onChangedCheck$.pipe(
        distinctUntilChanged(),
        filter((isDone) => {
          return isDone !== this.state.get('subtask')?.isDone;
        }),
        tap((isDone) => {
          this.state.set('subtask', ({ subtask }) => {
            return subtask == null
              ? subtask
              : {
                  ...subtask,
                  isDone,
                };
          });
        }),
        exhaustMap((isDone) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateIsDoone(isDone, subtask);
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
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const workStartDateTimestamp =
            subtask.workStartDateTimestamp && new Date().valueOf();
          return this.subtaskFacade.updateWorkTimeSec(
            sec,
            workStartDateTimestamp,
            subtask
          );
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        filter((sec) => {
          return sec !== this.state.get('subtask')?.scheduledTimeSec;
        }),
        tap((sec) => {
          this.state.set('subtask', (state) => {
            const subtask = state.subtask;
            return subtask == null
              ? subtask
              : {
                  ...subtask,
                  scheduledTimeSec: sec,
                };
          });
        }),
        exhaustMap((sec) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateScheduledTimeSec(sec, subtask);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        exhaustMap(() => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const now = new Date();
          this.state.set('subtask', (state) => {
            const subtask = state.subtask;
            return subtask == null
              ? subtask
              : {
                  ...subtask,
                  workStartDateTimestamp: now.valueOf(),
                };
          });
          return this.subtaskFacade.startTracking(now, subtask);
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        updateStateOnPause(this.state, 'subtask'),
        exhaustMap(({ updated }) => {
          return this.subtaskFacade.stopTracking(updated);
        })
      )
    );
    this.state.hold(
      this.onDelete$.pipe(
        exhaustMap(() => {
          const subtaskId = this.state.get('subtask')?.id;
          if (subtaskId == null) return of(undefined);
          return this.subtaskFacade.delete(subtaskId);
        })
      )
    );
    this.state.hold(
      this.onSubmitTitle$.pipe(
        tap((title) => {
          this.state.set('isEditableTitle', () => false);
          this.state.set('subtask', ({ subtask }) => {
            return subtask == null
              ? subtask
              : {
                  ...subtask,
                  title,
                };
          });
        }),
        exhaustMap((title) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateTitle(title, subtask);
        })
      )
    );
  }
}
