import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { Subtask, Task } from '@bison/frontend/domain';
import { Board, User } from '@bison/frontend/ui';
import { RxState, update } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  pairwise,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SubtaskFacadeService } from '../../facade/subtask-facade/subtask-facade.service';
import { TaskFacadeService } from '../../facade/task-facade/task-facade.service';

const USER_FIELDS = gql`
  fragment UserPartsInTaskCard on User {
    id
    name
    icon
  }
`;

const PROJECT_FIELDS = gql`
  fragment ProjectPartsInTaskCard on Project {
    id
    boards {
      id
      name
    }
  }
`;

type State = {
  task?: Task;
  isHovered: boolean;
  users: User[];
  boards: Board[];
};

@Component({
  selector: 'bis-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskCardComponent implements OnInit {
  @Input()
  set task(value: Task) {
    this.state.set('task', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onHover$ = new Subject<boolean>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onDelete$ = new Subject<void>();
  readonly onSelectedBoard$ = new Subject<Board['id']>();
  readonly onDrop$ = new Subject<CdkDragDrop<Task['subtasks']>>();
  readonly onAddSubtask$ = new Subject<void>();
  readonly onUpdatedSubtask$ = new Subject<Subtask>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskFacadeService: TaskFacadeService,
    private readonly subtaskFacadeService: SubtaskFacadeService,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {
    this.state.set({
      isHovered: false,
      users: [],
      boards: [],
    });
  }

  ngOnInit(): void {
    this.state.connect('isHovered', this.onHover$.asObservable());
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers({
          fields: USER_FIELDS,
          name: 'UserPartsInTaskCard',
        })
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
      'boards',
      this.state.select('task').pipe(
        map((task) => task?.board.project.id),
        filter((v): v is NonNullable<typeof v> => v != null),
        switchMap((projectId) => {
          return this.apolloDataQuery.queryProject(
            {
              fields: PROJECT_FIELDS,
              name: 'ProjectPartsInTaskCard',
            },
            projectId,
            { fetchPolicy: 'cache-only' }
          );
        }),
        map((response) => {
          return (
            response.data.project?.boards.map((board) => {
              return {
                id: board.id,
                name: board.name,
              };
            }) ?? []
          );
        })
      )
    );
    this.state.connect('task', this.onUpdatedSubtask$, ({ task }, subtask) => {
      if (task == null) return task;
      return {
        ...task,
        subtaks: update(task.subtasks, subtask, 'id'),
      };
    });

    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('task')?.assignUser?.id;
        }),
        exhaustMap((id) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateAssignUser(id, task);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        exhaustMap(() => {
          const now = new Date();
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  workStartDateTimestamp: now.valueOf(),
                };
          });
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.startTracking(now, task);
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        exhaustMap(() => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          const start = task.workStartDateTimestamp;
          const currentWorkTimeSec = task.workTimeSec;
          if (start == null || currentWorkTimeSec == null) return of(undefined);
          const now = new Date();
          const diffTimeMilliSec = now.valueOf() - start;
          const updatedWorkTimeSec =
            currentWorkTimeSec + Math.ceil(diffTimeMilliSec / 1000);
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  workTimeSec: updatedWorkTimeSec,
                  workStartDateTimestamp: undefined,
                };
          });
          return this.taskFacadeService.stopTracking(now, task);
        })
      )
    );
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        startWith(this.state.get('task')?.workTimeSec ?? 0),
        pairwise(),
        filter(([prev, sec]) => {
          const diff = sec - prev;
          const isChangedByCtrlBtn = diff > 1;
          const isTracking =
            this.state.get('task')?.workStartDateTimestamp != null;
          return isChangedByCtrlBtn || !isTracking;
        }),
        map(([, current]) => current),
        filter((sec) => {
          return sec !== this.state.get('task')?.workTimeSec;
        }),
        exhaustMap((sec) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          const workStartDateTimestamp =
            task.workStartDateTimestamp && new Date().valueOf();
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  workTimeSec: sec,
                  workStartDateTimestamp,
                };
          });
          return this.taskFacadeService.updateWorkTimeSec(
            sec,
            workStartDateTimestamp,
            task
          );
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        filter((sec) => {
          return sec !== this.state.get('task')?.scheduledTimeSec;
        }),
        tap((sec) => {
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  scheduledTimeSec: sec,
                };
          });
        }),
        exhaustMap((sec) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateScheduledTimeSec(sec, task);
        })
      )
    );
    this.state.hold(
      this.onDrop$.pipe(
        map((dropEvent) => {
          const task = this.state.get('task');
          if (task == null) {
            return [];
          }
          const subtasks = [...(task?.subtasks ?? [])];
          moveItemInArray(
            subtasks,
            dropEvent.previousIndex,
            dropEvent.currentIndex
          );
          return subtasks;
        }),
        tap((subtasks) => {
          const task = this.state.get('task');
          if (task == null) {
            return task;
          }
          const subtasksOrder = subtasks.map((v) => v.id);
          this.state.set('task', () => {
            return { ...task, subtasks, subtasksOrder };
          });
        }),
        exhaustMap((subtasks) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateSubtasksOrder(
            subtasks.map((v) => v.id),
            task
          );
        })
      )
    );
    this.state.hold(
      this.onDelete$.pipe(
        exhaustMap(() => {
          const taskId = this.state.get('task')?.id;
          if (taskId == null) return of(undefined);
          return this.taskFacadeService.delete(taskId);
        }),
        switchMap(() => {
          return this.notificationsService.show('タスクを削除しました', {
            hasCloseButton: true,
          });
        })
      )
    );
    this.state.hold(
      this.onSelectedBoard$.pipe(
        filter((boardId) => {
          return boardId !== this.state.get('task')?.board.id;
        }),
        exhaustMap((boardId) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateBoard(boardId, task);
        })
      )
    );
    this.state.hold(
      this.onAddSubtask$.pipe(
        exhaustMap(() => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.subtaskFacadeService.create('', task.id);
        }),
        filter((v): v is NonNullable<typeof v> => v != null),
        tap((subtask) => {
          this.state.set('task', ({ task }) => {
            if (task == null) return task;
            return {
              ...task,
              subtasks: [...task.subtasks, subtask],
              subtasksOrder: [...task.subtasksOrder, subtask.id],
            };
          });
        })
      )
    );
  }
}
