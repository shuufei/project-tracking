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
import { Subtask, Task } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { merge, of, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { convertToDomainSubtaskFromApiSubtask } from '../../../../util/convert-to-domain-subtask-from-api-subtask';
import { convertToDomainTaskFromApiTask } from '../../../../util/convert-to-domain-task-from-api-task';
import { mapToUpdatedWorkTimeSecState } from '../../../../util/custom-operators/map-to-updated-work-time-sec-state';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';
import { SubtaskFacadeService } from '../../../facade/subtask-facade/subtask-facade.service';
import {
  SUBTASK_FIELDS,
  SUBTASK_FRAGMENT_NAME,
} from '../../../fragments/subtask-fragment';
import {
  TASK_FIELDS,
  TASK_FRAGMENT_NAME,
} from '../../../fragments/task-fragment';
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
        filter((v) => v.type === 'Subtask'),
        switchMap((content) => {
          return this.apolloDataQuery.querySubtask(
            { fields: SUBTASK_FIELDS, name: SUBTASK_FRAGMENT_NAME },
            content.id
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
      'users',
      this.apolloDataQuery
        .queryUsers({ name: 'UserPartsInSubtaskDialog', fields: USER_FIELDS })
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
          return this.apolloDataQuery.queryTask(
            {
              fields: TASK_FIELDS,
              name: TASK_FRAGMENT_NAME,
            },
            subtask.taskId
          );
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
      this.taskDialogService.pushContent({ id: task.id, type: 'Task' });
    });

    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('subtask')?.assignUser?.id;
        }),
        switchMap((id) => {
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
        switchMap((isDone) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateIsDoone(isDone, subtask);
        })
      )
    );
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        mapToUpdatedWorkTimeSecState(this.state, 'subtask'),
        switchMap(({ current, updated }) => {
          console.log(current, updated);
          return this.subtaskFacade.updateWorkTimeSec(
            updated.workTimeSec,
            updated.workStartDateTimestamp,
            current
          );
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        filter((sec) => {
          return sec !== this.state.get('subtask')?.scheduledTimeSec;
        }),
        switchMap((sec) => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          return this.subtaskFacade.updateScheduledTimeSec(sec, subtask);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        switchMap(() => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const now = new Date();
          return this.subtaskFacade.startTracking(now, subtask);
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        switchMap(() => {
          const subtask = this.state.get('subtask');
          if (subtask == null) return of(undefined);
          const now = new Date();
          return this.subtaskFacade.stopTracking(now, subtask);
        })
      )
    );
    this.state.hold(
      this.onDelete$.pipe(
        exhaustMap(() => {
          const subtaskId = this.state.get('subtask')?.id;
          if (subtaskId == null) return of(undefined);
          this.taskDialogService.close();
          return merge(
            this.subtaskFacade.delete(subtaskId),
            this.notificationsService.show('サブタスクを削除しました', {
              hasCloseButton: true,
            })
          );
        })
      )
    );
  }
}
