import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { isSubtask, Subtask, Task } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
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
import { convertToDomainTaskFromApiTask } from '../../../../util/convert-to-domain-task-from-api-task';
import { SubtaskFacadeService } from '../../../facade/subtask-facade/subtask-facade.service';
import { TaskDialogService } from '../task-dialog.service';

const USER_FIELDS = gql`
  fragment UserPartsInSubtaskDialog on User {
    id
    name
    icon
  }
`;

type State = {
  subtask?: Subtask;
  users: User[];
  parentTask?: Task;
  isEditableTitleAndDesc: boolean;
  editState?: {
    title: Subtask['title'];
    description: Subtask['description'];
  };
};

@Component({
  selector: 'bis-task-dialog-subtask-content',
  templateUrl: './task-dialog-subtask-content.component.html',
  styleUrls: ['./task-dialog-subtask-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogSubtaskContentComponent implements OnInit {
  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly existsDialogPrevContent$ = this.taskDialogService.existsPrevContent$;

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onClickedBackButton$ = new Subject<void>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onClickedTask$ = new Subject<void>();
  readonly onChangedCheck$ = new Subject<boolean>();
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();
  readonly onDelete$ = new Subject<void>();
  readonly onClickedEditTitleAndDescButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescCancelButton$ = new Subject<void>();
  readonly onClickedUpdateTitleAndDescButton$ = new Subject<void>();
  readonly onChangedTitle$ = new Subject<Subtask['title']>();
  readonly onChangedDescription$ = new Subject<Subtask['description']>();

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private subtaskFacade: SubtaskFacadeService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {
    this.state.set({ users: [], isEditableTitleAndDesc: false });
  }

  ngOnInit(): void {
    this.state.connect(
      'subtask',
      this.taskDialogService.currentContent$.pipe(
        filter((v): v is Subtask => {
          return isSubtask(v);
        })
      )
    );
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers(
          { name: 'UserPartsInSubtaskDialog', fields: USER_FIELDS },
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
    this.state.connect(
      'parentTask',
      this.state.select('subtask').pipe(
        filter((v): v is NonNullable<typeof v> => v != null),
        switchMap((subtask) => {
          return this.apolloDataQuery.queryTask(subtask.taskId, undefined, {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-only',
          });
        }),
        map((response) => {
          return response.data.task;
        }),
        filter((v): v is NonNullable<typeof v> => v != null),
        map((task) => {
          return convertToDomainTaskFromApiTask(task);
        })
      )
    );
    this.state.connect(this.onClickedEditTitleAndDescButton$, (state) => {
      return {
        ...state,
        isEditableTitleAndDesc: true,
        editState: {
          title: state.subtask?.title ?? '',
          description: state.subtask?.description,
        },
      };
    });
    this.state.connect(
      'isEditableTitleAndDesc',
      this.onClickedEditTitleAndDescCancelButton$,
      () => {
        return false;
      }
    );
    this.state.connect(
      'isEditableTitleAndDesc',
      this.onClickedUpdateTitleAndDescButton$,
      () => {
        return false;
      }
    );
    this.state.connect('editState', this.onChangedTitle$, (state, title) => {
      return { title, description: state.editState?.description };
    });
    this.state.connect(
      'editState',
      this.onChangedDescription$,
      (state, description) => {
        return { description, title: state.editState?.title ?? '' };
      }
    );

    this.state.hold(
      this.onClickedUpdateTitleAndDescButton$.pipe(
        exhaustMap(() => {
          const subtask = this.state.get('subtask');
          const editState = this.state.get('editState');
          if (subtask == null || editState == null) return of(undefined);
          this.state.set('subtask', () => {
            return {
              ...subtask,
              title: editState.title,
              description: editState.description,
            };
          });
          return this.subtaskFacade.updateTitleAndDescription(
            editState.title,
            editState.description,
            subtask
          );
        })
      )
    );
    this.state.hold(this.onClickedCloseButton$, () => {
      this.taskDialogService.close();
    });
    this.state.hold(this.onClickedBackButton$, () => {
      this.taskDialogService.back();
    });
    this.state.hold(this.onClickedTask$, () => {
      const task = this.state.get('parentTask');
      if (task == null) {
        return;
      }
      this.taskDialogService.pushContent(task);
    });

    /**
     * subtask-card.componentの実装とほぼ同じなので共通化したい
     */
    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('subtask')?.assignUser?.id;
        }),
        exhaustMap((id) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateAssignUser(id, subtask);
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
        exhaustMap(() => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const start = subtask.workStartDateTimestamp;
          const currentWorkTimeSec = subtask.workTimeSec;
          if (start == null || currentWorkTimeSec == null) return of(undefined);
          const now = new Date();
          const diffTimeMilliSec = now.valueOf() - start;
          const updatedWorkTimeSec =
            currentWorkTimeSec + Math.ceil(diffTimeMilliSec / 1000);
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
          return this.subtaskFacade.stopTracking(now, subtask);
        })
      )
    );
    this.state.hold(
      this.onDelete$.pipe(
        exhaustMap(() => {
          const subtaskId = this.state.get('subtask')?.id;
          if (subtaskId == null) return of(undefined);
          return this.subtaskFacade.delete(subtaskId);
        }),
        tap(() => {
          this.taskDialogService.close();
        }),
        switchMap(() => {
          return this.notificationsService.show('サブタスクが削除されました', {
            hasCloseButton: true,
          });
        })
      )
    );
  }
}
