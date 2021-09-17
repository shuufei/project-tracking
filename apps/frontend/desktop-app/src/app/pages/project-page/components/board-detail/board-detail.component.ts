import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Board, Task, TaskGroup as UiTaskGroup } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { BoardTasksOrderItem, Id, Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { forkJoin, Observable, Subject } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { TaskFacadeService } from '../../../../shared/facade/task-facade/task-facade.service';
import { TaskGroupFacadeService } from '../../../../shared/facade/task-group-facade/task-group-facade.service';
import {
  BOARD_FIELDS,
  BOARD_FRAGMENT_NAME,
} from '../../../../shared/fragments/board-fragment';
import { convertToDomainBoardFromApiBoard } from '../../../../util/convert-to-domain-board-from-api-board';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';

// TODO: タスクグループをD&Dできるようにする

const USER_FIELDS = gql`
  fragment UserPartsInBoard on User {
    id
    name
    icon
  }
`;

type State = {
  board?: Board;
  taskGroups: TaskGroup[];
  soloTasks: Tasks;
  users: User[];
};

@Component({
  selector: 'bis-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardDetailComponent implements OnInit {
  readonly statuses: Status[] = ['TODO', 'INPROGRESS', 'CONFIRM', 'DONE'];

  readonly state$ = this.state.select();
  readonly boardId$ = this.route.paramMap.pipe(
    map((param) => param.get('boardId')),
    nonNullable()
  );

  /**
   * Event
   */
  readonly onDrop$ = new Subject<
    [CdkDragDrop<Task[]>, TaskGroup | undefined]
  >();
  readonly onChangedTaskGroupStatus$ = new Subject<[Status, TaskGroup]>();
  readonly onChangedTaskGroupAssignUser$ = new Subject<
    [User['id'] | undefined, TaskGroup]
  >();
  readonly onChangedTaskGroupScheduledTime$ = new Subject<
    [number, TaskGroup]
  >();

  constructor(
    private state: RxState<State>,
    private route: ActivatedRoute,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskGroupFacadeService: TaskGroupFacadeService,
    private taskFacadeService: TaskFacadeService
  ) {
    this.state.set({
      taskGroups: [],
      soloTasks: { TODO: [], INPROGRESS: [], CONFIRM: [], DONE: [] },
      users: [],
    });
  }

  ngOnInit() {
    this.setupEventHandler();
  }

  trackById(_: number, item: { id: Id }) {
    return item.id;
  }

  // keyvalueパイプが勝手にソートするのを防ぐ
  noOpCompare() {
    return 0;
  }

  private setupEventHandler() {
    this.state.connect('board', this.queryBoard$());
    this.state.connect('users', this.queryUsers$());

    this.state.hold(
      this.onDrop$.pipe(
        // TODO: リファクタ
        map(([event, taskGroup]) => {
          //FIXME: 他のタスクグループにも移動できてしまう。
          let newTaskGroup: UiTaskGroup | undefined;
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
            const tasks = taskGroup
              ? taskGroup.tasks
              : this.state.get('soloTasks');
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

            // タスクの順番更新
            this.state.set('taskGroups', ({ taskGroups }) => {
              const taskGroupIdx = taskGroups.indexOf(taskGroup);
              if (taskGroupIdx === -1) {
                throw new Error('taskGroup was not found.');
              }
              return [
                ...taskGroups.slice(0, taskGroupIdx),
                { ...taskGroup, tasksOrder: newTasksOrder },
                ...taskGroups.slice(taskGroupIdx + 1),
              ];
            });

            newTaskGroup = {
              ...taskGroup,
              tasksOrder: newTasksOrder,
              tasks: allTasks,
            };
          }

          return [newTaskGroup, task, newStatus, newTasksOrder] as const;
        }),
        concatMap(([newTaskGroup, task, newStatus, newTasksOrder]) => {
          // TODO: 楽観的更新を検討する
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

  private queryBoard$() {
    return this.boardId$.pipe(
      switchMap((boardId) => {
        return this.apolloDataQuery
          .queryBoard(
            {
              name: BOARD_FRAGMENT_NAME,
              fields: BOARD_FIELDS,
            },
            boardId
          )
          .pipe(
            map((response) => {
              const { board } = response.data;
              if (!board) {
                return;
              }
              return convertToDomainBoardFromApiBoard(board);
            }),
            tap((board) => {
              if (!board) {
                return;
              }
              this.state.set('taskGroups', () =>
                board.taskGroups.map((v) => ({
                  ...v,
                  tasks: this.sortTasksByStatusAndOrder(v.tasks, v.tasksOrder),
                }))
              );

              this.state.set('soloTasks', () =>
                this.sortTasksByStatusAndOrder(
                  board.soloTasks,
                  board.tasksOrder
                )
              );
            })
          );
      })
    );
  }

  private queryUsers$() {
    return this.apolloDataQuery
      .queryUsers({
        fields: USER_FIELDS,
        name: 'UserPartsInBoard',
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
      );
  }

  private sortTasksByStatusAndOrder(
    tasks: Task[],
    tasksOrder: TaskGroup['tasksOrder'] | Board['tasksOrder']
  ): Tasks {
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

    const sortedTasks: Tasks = {
      TODO: [],
      INPROGRESS: [],
      CONFIRM: [],
      DONE: [],
    };
    tasks.forEach((task) => sortedTasks[task.status].push(task));
    return sortedTasks;
  }

  private concatTasks(tasks: Tasks): Task[] {
    return ([] as Task[]).concat(...Object.values(tasks));
  }
}

type Tasks = { [key in Status]: Task[] };

type TaskGroup = Omit<UiTaskGroup, 'tasks'> & { tasks: Tasks };
