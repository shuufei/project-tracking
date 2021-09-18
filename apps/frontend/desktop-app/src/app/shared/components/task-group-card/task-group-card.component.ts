import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
import { Task, TaskGroup } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { Board, BoardTasksOrderItem, Id, Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { forkJoin, Observable, Subject } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { convertToDomainTaskGroupFromApiTaskGroup } from '../../../util/convert-to-domain-task-group-from-api-task-group';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import { TaskFacadeService } from '../../facade/task-facade/task-facade.service';
import { TaskGroupFacadeService } from '../../facade/task-group-facade/task-group-facade.service';
import {
  TASK_GROUP_FIELDS,
  TASK_GROUP_FRAGMENT_NAME,
} from '../../fragments/task-group-fragment';

const USER_FIELDS = gql`
  fragment UserPartsInTaskGroupCard on User {
    id
    name
    icon
  }
`;

type State = {
  taskGroupId?: TaskGroup['id'];
  taskGroup?: TaskGroupWithCategorizedTasks;
  users: User[];
};

@Component({
  selector: 'bis-task-group-card',
  templateUrl: './task-group-card.component.html',
  styleUrls: ['./task-group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskGroupCardComponent implements OnInit {
  @Input()
  set taskGroupId(value: State['taskGroupId']) {
    this.state.set('taskGroupId', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onDrop$ = new Subject<CdkDragDrop<Task[]>>();
  readonly onChangedTaskGroupStatus$ = new Subject<TaskGroup['status']>();
  readonly onChangedTaskGroupAssignUser$ = new Subject<User['id']>();
  readonly onChangedTaskGroupScheduledTime$ = new Subject<number>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskGroupFacadeService: TaskGroupFacadeService,
    private taskFacadeService: TaskFacadeService
  ) {
    this.state.set({ users: [] });
  }

  ngOnInit(): void {
    this.state.connect(
      'taskGroup',
      this.queryTaskGroup$().pipe(
        map((taskGroup) => {
          return {
            ...taskGroup,
            tasks: this.sortTasksByStatusAndOrder(
              taskGroup.tasks,
              taskGroup.tasksOrder
            ),
          };
        })
      )
    );
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers({ fields: USER_FIELDS, name: 'UserPartsInTaskGroupCard' })
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
                imageSrc: user.icon,
              };
            });
          })
        )
    );

    this.state.hold(
      this.onChangedTaskGroupStatus$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        switchMap(([status, taskGroup]) => {
          return this.taskGroupFacadeService.updateStatus(
            status,
            this.convertToTaskGroupFromTaskGroupWithCategorizedTasks(taskGroup)
          );
        })
      )
    );

    this.state.hold(
      this.onChangedTaskGroupAssignUser$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        filter(([id, taskGroup]) => id !== taskGroup.assignUser?.id),
        switchMap(([id, taskGroup]) => {
          return this.taskGroupFacadeService.updateAssignUser(
            id,
            this.convertToTaskGroupFromTaskGroupWithCategorizedTasks(taskGroup)
          );
        })
      )
    );

    this.state.hold(
      this.onChangedTaskGroupScheduledTime$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        filter(([sec, taskGroup]) => sec !== taskGroup.scheduledTimeSec),
        switchMap(([timeSec, taskGroup]) => {
          return this.taskGroupFacadeService.updateScheduledTimeSec(
            timeSec,
            this.convertToTaskGroupFromTaskGroupWithCategorizedTasks(taskGroup)
          );
        })
      )
    );

    this.state.hold(
      this.onDrop$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        // TODO: リファクタ
        map(([event, taskGroup]) => {
          //FIXME: 他のタスクグループにも移動できてしまう。
          let newTaskGroup: TaskGroup | undefined;
          let newStatus: Status | undefined;
          let newTasksOrder: TaskGroup['tasksOrder'] = [];
          const task = event.previousContainer.data[event.previousIndex];
          if (event.previousContainer === event.container) {
            moveItemInArray(
              event.container.data,
              event.previousIndex,
              event.currentIndex
            );
          } else {
            const tasks = taskGroup.tasks;
            // 移動先ステータスを見つける
            const statusIdx = Object.values(tasks).findIndex(
              (list) => list === event.container.data
            );
            if (statusIdx === -1) {
              throw new Error('status was not found.');
            }
            newStatus = Object.keys(tasks)[statusIdx] as Status;

            // ステータス更新
            event.previousContainer.data.splice(event.previousIndex, 1, {
              ...task,
              status: newStatus,
            });

            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex
            );
          }

          if (taskGroup) {
            // タスクグループのすべてのタスクを一つの配列にしてtasksOrderを求める
            const allTasks = this.concatTasks(taskGroup.tasks);
            newTasksOrder = allTasks.map((task) => task.id);
            newTaskGroup = {
              ...taskGroup,
              tasksOrder: newTasksOrder,
              tasks: allTasks,
            };
          }

          return [newTaskGroup, task, newStatus, newTasksOrder] as const;
        }),
        concatMap(([newTaskGroup, task, newStatus, newTasksOrder]) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const updates: Observable<any>[] = [];
          if (newStatus) {
            updates.push(this.taskFacadeService.updateStatus(newStatus, task));
          }
          if (newTaskGroup) {
            updates.push(
              this.taskGroupFacadeService.updateTasksOrder(
                newTasksOrder,
                newTaskGroup
              )
            );
          }
          return forkJoin(updates);
        })
      )
    );
  }

  // keyvalueパイプが勝手にソートするのを防ぐ
  noOpCompare() {
    return 0;
  }

  trackById(_: number, item: { id: Id }) {
    return item.id;
  }

  private queryTaskGroup$() {
    return this.state.select('taskGroupId').pipe(
      nonNullable(),
      switchMap((id) => {
        return this.apolloDataQuery.queryTaskGroup(
          { fields: TASK_GROUP_FIELDS, name: TASK_GROUP_FRAGMENT_NAME },
          id
        );
      }),
      map((response) => response.data.taskGroup),
      nonNullable(),
      map((taskGroup) => {
        return convertToDomainTaskGroupFromApiTaskGroup(taskGroup);
      })
    );
  }

  private sortTasksByStatusAndOrder(
    tasks: Task[],
    tasksOrder: TaskGroup['tasksOrder'] | Board['tasksOrder']
  ): CategorizedTasksByStatus {
    // tasksOrderに従ってソート、tasksOrderに存在しない場合はcreatedAtによる昇順ソート
    if (tasksOrder.length > 0) {
      const isBoardTasksOrder = (
        order: typeof tasksOrder
      ): order is BoardTasksOrderItem[] => typeof order[0] === 'object';

      let getOrder: (task: Task) => number;
      if (isBoardTasksOrder(tasksOrder)) {
        getOrder = (task) =>
          tasksOrder.findIndex((order) => order.taskId === task.id);
      } else {
        getOrder = (task) =>
          tasksOrder.findIndex((taskId) => taskId === task.id);
      }
      tasks.sort((a, b) => {
        const aOrder = getOrder(a);
        const bOrder = getOrder(b);
        if (aOrder === -1 && bOrder === -1) {
          return a.createdAt - b.createdAt;
        }
        if (aOrder === -1) {
          return 1;
        }
        if (bOrder === -1) {
          return -1;
        }
        return aOrder - bOrder;
      });
    }

    const sortedTasks: CategorizedTasksByStatus = {
      TODO: [],
      INPROGRESS: [],
      CONFIRM: [],
      DONE: [],
    };
    tasks.forEach((task) => sortedTasks[task.status].push(task));
    return sortedTasks;
  }

  private convertToTaskGroupFromTaskGroupWithCategorizedTasks(
    taskGroup: TaskGroupWithCategorizedTasks
  ): TaskGroup {
    return {
      ...taskGroup,
      tasks: this.concatTasks(taskGroup.tasks),
    };
  }

  private concatTasks(tasks: CategorizedTasksByStatus): Task[] {
    return ([] as Task[]).concat(...Object.values(tasks));
  }
}

type CategorizedTasksByStatus = { [key in Status]: Task[] };

type TaskGroupWithCategorizedTasks = Omit<TaskGroup, 'tasks'> & {
  tasks: CategorizedTasksByStatus;
};
