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
import { RxState } from '@rx-angular/state';
import { TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { convertToDomainTaskFromApiTask } from '../../../util/convert-to-domain-task-from-api-task';
import { mapToUpdatedScheduledTimeSecState } from '../../../util/custom-operators/map-to-updated-scheduled-time-sec-state';
import { mapToUpdatedWorkTimeSecState } from '../../../util/custom-operators/map-to-updated-work-time-sec-state';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import { sortSubtasks } from '../../../util/custom-operators/sort-subtasks';
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
            taskId
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
          map((response) => response.data?.users),
          nonNullable(),
          map((users) => {
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
        map((response) => response.data?.project?.boards),
        nonNullable(),
        map((boards) => {
          return (
            boards.map((board) => {
              return {
                id: board.id,
                name: board.name,
              };
            }) ?? []
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
      this.onDelete$.pipe(
        switchMap(() => {
          const taskId = this.state.get('task')?.id;
          if (taskId == null) return of(undefined);
          return merge(
            this.taskFacadeService.delete(taskId),
            this.notificationsService.show('タスクを削除しました', {
              hasCloseButton: true,
            })
          );
        })
      )
    );
    this.state.hold(
      this.onSelectedBoard$.pipe(
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
