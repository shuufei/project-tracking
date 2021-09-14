import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { Task } from '@bison/frontend/domain';
import { Board, User } from '@bison/frontend/ui';
import { Id } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { merge, of, Subject } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { convertToDomainTaskFromApiTask } from '../../../../util/convert-to-domain-task-from-api-task';
import { mapToUpdatedScheduledTimeSecState } from '../../../../util/custom-operators/map-to-updated-scheduled-time-sec-state';
import { mapToUpdatedWorkTimeSecState } from '../../../../util/custom-operators/map-to-updated-work-time-sec-state';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';
import { sortSubtasks } from '../../../../util/custom-operators/sort-subtasks';
import { SubtaskFacadeService } from '../../../facade/subtask-facade/subtask-facade.service';
import { TaskFacadeService } from '../../../facade/task-facade/task-facade.service';
import {
  TASK_FIELDS,
  TASK_FRAGMENT_NAME,
} from '../../../fragments/task-fragment';
import { TaskDialogService } from '../task-dialog.service';

const USER_FIELDS = gql`
  fragment UserPartsInTaskDialog on User {
    id
    name
    icon
  }
`;

const PROJECT_FIELDS = gql`
  fragment ProjectPartsInTaskDialog on Project {
    id
    boards {
      id
      name
    }
  }
`;

type State = {
  task?: Task;
  isEditableTitleAndDesc: boolean;
  editState?: {
    title: Task['title'];
    description: Task['description'];
  };
  users: User[];
  boards: Board[];
};

@Component({
  selector: 'bis-task-dialog-task-content',
  templateUrl: './task-dialog-task-content.component.html',
  styleUrls: ['./task-dialog-task-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogTaskContentComponent implements OnInit {
  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly existsDialogPrevContent$ = this.taskDialogService.existsPrevContent$;
  readonly subtasks$ = this.state
    .select('task')
    .pipe(nonNullable(), sortSubtasks());

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescCancelButton$ = new Subject<void>();
  readonly onClickedUpdateTitleAndDescButton$ = new Subject<void>();
  readonly onChangedTitle$ = new Subject<Task['title']>();
  readonly onChangedDescription$ = new Subject<Task['description']>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onChangedStatus$ = new Subject<Task['status']>();
  readonly onChangedBoard$ = new Subject<Board['id']>();
  readonly onDrop$ = new Subject<CdkDragDrop<Task['subtasks']>>();
  readonly onClickedTaskGroup$ = new Subject<void>();
  readonly onClickedSubtask$ = new Subject<Task['subtasks'][number]>();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onDelete$ = new Subject<void>();
  readonly onClickedAddSubtask$ = new Subject<void>();
  readonly onClickedBackButton$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    private readonly subtaskFacadeService: SubtaskFacadeService,
    private readonly taskFacadeService: TaskFacadeService
  ) {
    this.state.set({
      isEditableTitleAndDesc: false,
      users: [],
      boards: [],
    });
  }

  ngOnInit(): void {
    this.state.connect(
      'task',
      this.taskDialogService.currentContent$.pipe(
        filter((latestContent) => {
          return latestContent.type === 'Task';
        }),
        switchMap((latestContent) => {
          return this.apolloDataQuery.queryTask(
            { fields: TASK_FIELDS, name: TASK_FRAGMENT_NAME },
            latestContent.id
          );
        }),
        map((response) => response.data?.task),
        nonNullable(),
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
          title: state.task?.title ?? '',
          description: state.task?.description,
        },
      };
    });
    this.state.connect(this.onClickedEditTitleAndDescCancelButton$, (state) => {
      return { ...state, isEditableTitleAndDesc: false };
    });
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
    this.state.connect(
      'boards',
      this.state.select('task').pipe(
        map((v) => v?.board.project.id),
        filter((v): v is NonNullable<typeof v> => v != null),
        switchMap((projectId) => {
          return this.apolloDataQuery.queryProject(
            {
              fields: PROJECT_FIELDS,
              name: 'ProjectPartsInTaskDialog',
            },
            projectId
          );
        }),
        map((v) => v.data.project),
        filter((v): v is NonNullable<typeof v> => v != null),
        map((project) => {
          return project.boards.map((board) => {
            return {
              id: board.id,
              name: board.name,
            };
          });
        })
      )
    );
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers({ name: 'UserPartsInTaskDialog', fields: USER_FIELDS })
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
      this.onClickedAddSubtask$.pipe(
        mergeMap(() => {
          const task = this.state.get('task');
          if (task == null) {
            return of(undefined);
          }
          return this.subtaskFacadeService.create('', task.id);
        })
      )
    );

    this.state.hold(this.onClickedCloseButton$, () => {
      this.taskDialogService.close();
    });
    this.state.hold(
      this.onClickedUpdateTitleAndDescButton$.pipe(
        switchMap(() => {
          const task = this.state.get('task');
          const editState = this.state.get('editState');
          if (task == null || editState == null) return of(undefined);
          return this.taskFacadeService.updateTitleAndDescription(
            editState.title,
            editState.description,
            task
          );
        })
      )
    );
    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('task')?.assignUser?.id;
        }),
        switchMap((id) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateAssignUser(id, task);
        })
      )
    );
    this.state.hold(
      this.onChangedStatus$.pipe(
        filter((status) => {
          return status !== this.state.get('task')?.status;
        }),
        switchMap((status) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateStatus(status, task);
        })
      )
    );
    this.state.hold(
      this.onChangedBoard$.pipe(
        filter((boardId) => {
          return boardId !== this.state.get('task')?.board.id;
        }),
        switchMap((boardId) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateBoard(boardId, task);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        switchMap(() => {
          const now = new Date();
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.startTracking(now, task);
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        switchMap(() => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          const now = new Date();
          return this.taskFacadeService.stopTracking(now, task);
        })
      )
    );
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        mapToUpdatedWorkTimeSecState(this.state, 'task'),
        switchMap(({ updated, current }) => {
          return this.taskFacadeService.updateWorkTimeSec(
            updated.workTimeSec,
            updated.workStartDateTimestamp,
            current
          );
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        mapToUpdatedScheduledTimeSecState(this.state, 'task'),
        switchMap(({ updated, current }) => {
          return this.taskFacadeService.updateScheduledTimeSec(
            updated.scheduledTimeSec,
            current
          );
        })
      )
    );
    this.state.hold(
      this.onDrop$.pipe(
        withLatestFrom(this.subtasks$),
        map(([dropEvent, sortedSubtasks]) => {
          const task = this.state.get('task');
          if (task == null) {
            return [];
          }
          const subtasksOrder = [
            ...(sortedSubtasks.map((v) => v.id) ?? []),
          ].filter((id) => task.subtasks.map((v) => v.id).includes(id));
          moveItemInArray(
            subtasksOrder,
            dropEvent.previousIndex,
            dropEvent.currentIndex
          );
          return subtasksOrder;
        }),
        switchMap((subtasksOrder) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateSubtasksOrder(
            subtasksOrder,
            task
          );
        })
      )
    );
    this.state.hold(
      this.onClickedTaskGroup$.pipe(
        map(() => {
          const task = this.state.get('task');
          return task?.taskGroup;
        }),
        nonNullable()
      ),
      (taskGroup) => {
        this.taskDialogService.pushContent({
          id: taskGroup.id,
          type: 'TaskGroup',
        });
      }
    );
    this.state.hold(this.onClickedSubtask$, (subtask) => {
      this.taskDialogService.pushContent({ id: subtask.id, type: 'Subtask' });
    });
    this.state.hold(
      this.onDelete$.pipe(
        exhaustMap(() => {
          const taskId = this.state.get('task')?.id;
          if (taskId == null) return of(undefined);
          this.taskDialogService.close();
          return merge(
            this.taskFacadeService.delete(taskId),
            this.notificationsService.show('タスクを削除しました', {
              hasCloseButton: true,
            })
          );
        })
      )
    );
    this.state.hold(this.onClickedBackButton$, () => {
      this.taskDialogService.back();
    });
  }

  trackById(_: number, item: { id: Id }) {
    return item.id;
  }
}
