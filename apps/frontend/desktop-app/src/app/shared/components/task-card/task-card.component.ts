import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
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
import { BehaviorSubject, of, Subject } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { convertToDomainTaskFromApiTask } from '../../../util/convert-to-domain-task-from-api-task';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import { sortSubtasks } from '../../../util/custom-operators/sort-subtasks';
import { updateScheduledTimeSecState } from '../../../util/custom-operators/state-updators/update-scheduled-time-sec-state';
import { updateWorkTimeSecState } from '../../../util/custom-operators/state-updators/update-work-time-sec-state';
import { SubtaskFacadeService } from '../../facade/subtask-facade/subtask-facade.service';
import { TaskFacadeService } from '../../facade/task-facade/task-facade.service';
import { TASK_FIELDS, TASK_FRAGMENT_NAME } from '../../fragments/task-fragment';

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
  set taskId(value: Task['id']) {
    this.taskId$.next(value);
  }
  @Output() clickedSubtask = new EventEmitter<Subtask>();

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly taskId$ = new BehaviorSubject<Task['id'] | undefined>(undefined);
  readonly subtasks$ = this.state
    .select('task')
    .pipe(nonNullable(), sortSubtasks());

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
  readonly onClickedSubtask$ = new Subject<Subtask['id']>();
  readonly onchangedTitle$ = new Subject<Task['title']>();

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
    this.state.connect(
      'task',
      this.taskId$.pipe(
        nonNullable(),
        switchMap((taskId) => {
          return this.apolloDataQuery.queryTask(
            { fields: TASK_FIELDS, name: TASK_FRAGMENT_NAME },
            taskId,
            { fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-first' }
          );
        }),
        map((result) => result.data?.task),
        nonNullable(),
        map((task) => {
          return convertToDomainTaskFromApiTask(task);
        })
      )
    );
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
        subtasks: update(task.subtasks, subtask, 'id'),
      };
    });

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
        updateWorkTimeSecState(this.state, 'task'),
        exhaustMap(({ updated, current }) => {
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
        updateScheduledTimeSecState(this.state, 'task'),
        exhaustMap(({ updated, current }) => {
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
          this.state.set('task', (state) => {
            const board = state.boards.find((v) => v.id === boardId);
            return board != null
              ? {
                  ...task,
                  board: { ...task.board, id: board.id, name: board.name },
                }
              : task;
          });
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
        })
      )
    );
    this.state.hold(this.onClickedSubtask$, (subtaskId) => {
      const subtask = this.state
        .get('task')
        ?.subtasks.find((v) => v.id === subtaskId);
      if (subtask == null) return;
      this.clickedSubtask.emit(subtask);
    });
    this.state.hold(
      this.onchangedTitle$.pipe(
        switchMap((title) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateTitle(title, task);
        })
      )
    );
  }

  trackBySubtask(_: number, value: Subtask) {
    return value.id;
  }
}
