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
  CREATE_TASK_GROUP_USECASE,
  CREATE_TASK_ON_BOARD_USECASE,
  IApolloDataQuery,
  ICreateTaskGroupUsecase,
  ICreateTaskOnBoardUsecase,
  IUpdateBoardUsecase,
  UPDATE_BOARD_USECASE,
} from '@bison/frontend/application';
import { Board, Subtask, Task, TaskGroup } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { BoardTasksOrderItem, Id, Status } from '@bison/shared/domain';
import { UpdateBoardInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { merge, Observable, Subject } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { TaskDialogService } from '../../../../shared/components/task-dialog/task-dialog.service';
import { TaskFacadeService } from '../../../../shared/facade/task-facade/task-facade.service';
import {
  BOARD_FIELDS,
  BOARD_FRAGMENT_NAME,
} from '../../../../shared/fragments/board-fragment';
import { convertToApiTaskTypeFromDomainTaskType } from '../../../../util/convert-to-api-task-type-from-domain-task-type';
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

  readonly onClickTaskGroup$ = new Subject<TaskGroup['id']>();
  readonly onClickTask$ = new Subject<Task['id']>();
  readonly onClickSubask$ = new Subject<Subtask['id']>();
  readonly onClickCreateTaskGroup$ = new Subject<void>();
  readonly onClickCreateTask$ = new Subject<void>();
  readonly onDropTaskGroup$ = new Subject<CdkDragDrop<TaskGroup[]>>();
  readonly onDropSoloTask$ = new Subject<CdkDragDrop<TaskGroup['tasks']>>();

  constructor(
    private state: RxState<State>,
    private route: ActivatedRoute,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskDialogService: TaskDialogService,
    @Inject(CREATE_TASK_ON_BOARD_USECASE)
    private createTaskOnBoardUsecase: ICreateTaskOnBoardUsecase,
    @Inject(CREATE_TASK_GROUP_USECASE)
    private createTaskGroupUsecase: ICreateTaskGroupUsecase,
    @Inject(UPDATE_BOARD_USECASE)
    private updateBoardUsecase: IUpdateBoardUsecase,
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
    this.state.hold(
      this.onClickTaskGroup$.pipe(
        tap((v) => {
          this.taskDialogService.pushContent({
            id: v,
            type: 'TaskGroup',
          });
          this.taskDialogService.open();
        })
      )
    );
    this.state.hold(
      this.onClickTask$.pipe(
        tap((v) => {
          this.taskDialogService.pushContent({
            id: v,
            type: 'Task',
          });
          this.taskDialogService.open();
        })
      )
    );
    this.state.hold(
      this.onClickSubask$.pipe(
        tap((v) => {
          this.taskDialogService.pushContent({
            id: v,
            type: 'Subtask',
          });
          this.taskDialogService.open();
        })
      )
    );
    this.state.hold(
      this.onClickCreateTask$.pipe(
        withLatestFrom(this.state.select('board').pipe(nonNullable())),
        switchMap(([, board]) => {
          return this.createTaskOnBoardUsecase.excute(
            {
              title: '',
              description: '',
              assignUserId: undefined,
              boardId: board.id,
            },
            board.projectId
          );
        })
      )
    );
    this.state.hold(
      this.onClickCreateTaskGroup$.pipe(
        withLatestFrom(this.state.select('board').pipe(nonNullable())),
        switchMap(([, board]) => {
          return this.createTaskGroupUsecase.execute(
            {
              title: '',
              description: '',
              boardId: board.id,
              scheduledTimeSec: 0,
            },
            board.projectId
          );
        })
      )
    );
    this.state.hold(
      this.onDropSoloTask$.pipe(
        withLatestFrom(
          this.state.select('soloTasks').pipe(nonNullable()),
          this.state.select('taskGroups').pipe(nonNullable()),
          this.state.select('board').pipe(nonNullable())
        ),
        map(([dropEvent, soloTasks, taskGroups, board]) => {
          const task =
            dropEvent.previousContainer.data[dropEvent.previousIndex];
          let newStatus: Status | undefined;
          if (dropEvent.previousContainer === dropEvent.container) {
            moveItemInArray(
              dropEvent.container.data,
              dropEvent.previousIndex,
              dropEvent.currentIndex
            );
          } else {
            // 移動先ステータスを見つける
            const statusIdx = Object.values(soloTasks).findIndex(
              (list) => list === dropEvent.container.data
            );
            if (statusIdx === -1) {
              throw new Error('status was not found.');
            }
            newStatus = Object.keys(soloTasks)[statusIdx] as Status;
            // ステータス更新
            dropEvent.previousContainer.data.splice(
              dropEvent.previousIndex,
              1,
              {
                ...task,
                status: newStatus,
              }
            );

            transferArrayItem(
              dropEvent.previousContainer.data,
              dropEvent.container.data,
              dropEvent.previousIndex,
              dropEvent.currentIndex
            );
          }
          const soloTasksOrder: BoardTasksOrderItem[] = ([] as Task[])
            .concat(...Object.values(soloTasks))
            .map((task) => ({
              taskId: task.id,
              type: 'Task',
            }));
          const taskGroupsOrder: BoardTasksOrderItem[] = taskGroups.map(
            (taskGroup) => ({
              taskId: taskGroup.id,
              type: 'TaskGroup',
            })
          );
          const tasksOrder = [...soloTasksOrder, ...taskGroupsOrder];
          return [task, newStatus, tasksOrder, board] as const;
        }),
        switchMap(([task, newStatus, tasksOrder, board]) => {
          const updates: Observable<unknown>[] = [];
          const input: UpdateBoardInput = {
            id: board.id,
            name: board.name,
            description: board.description,
            projectId: board.projectId,
            tasksOrder: tasksOrder.map((v) => ({
              taskId: v.taskId,
              type: convertToApiTaskTypeFromDomainTaskType(v.type),
            })),
          };
          updates.push(this.updateBoardUsecase.execute(input));
          if (newStatus) {
            updates.push(this.taskFacadeService.updateStatus(newStatus, task));
          }
          return merge(...updates);
        })
      )
    );
    this.state.hold(
      this.onDropTaskGroup$.pipe(
        withLatestFrom(
          this.state.select('board').pipe(nonNullable()),
          this.state.select('taskGroups').pipe(nonNullable())
        ),
        map(([dropEvent, board, taskGroups]) => {
          const taskGroupsOrder: BoardTasksOrderItem[] = taskGroups.map(
            (taskGroup) => ({
              taskId: taskGroup.id,
              type: 'TaskGroup',
            })
          );
          const tasksOrder = board.tasksOrder.filter((v) => v.type === 'Task');
          moveItemInArray(
            taskGroupsOrder,
            dropEvent.previousIndex,
            dropEvent.currentIndex
          );
          return [[...taskGroupsOrder, ...tasksOrder], board] as const;
        }),
        switchMap(([tasksOrder, board]) => {
          const input: UpdateBoardInput = {
            id: board.id,
            name: board.name,
            description: board.description,
            projectId: board.projectId,
            tasksOrder: tasksOrder.map((v) => ({
              taskId: v.taskId,
              type: convertToApiTaskTypeFromDomainTaskType(v.type),
            })),
          };
          return this.updateBoardUsecase.execute(input);
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

  private setupEventHandler() {
    this.state.connect('board', this.queryBoard$());
    this.state.connect('users', this.queryUsers$());
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
            map((response) => response.data?.board),
            nonNullable(),
            map((board) => {
              return convertToDomainBoardFromApiBoard(board);
            }),
            tap((board) => {
              if (!board) {
                return;
              }
              this.state.set('taskGroups', () => {
                return this.sortTaskGroups(board.taskGroups, board.tasksOrder);
              });
              this.state.set('soloTasks', () => {
                const sorted = this.sortTasksByStatusAndOrder(
                  board.soloTasks,
                  board.tasksOrder
                );
                return sorted;
              });
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

  private sortTaskGroups(
    taskGroups: TaskGroup[],
    tasksOrder: Board['tasksOrder']
  ): TaskGroup[] {
    const taskGroupsOrder = tasksOrder.filter((v) => v.type === 'TaskGroup');
    const sortedByOrder = taskGroupsOrder
      .map((orderItem) =>
        taskGroups.find((taskGroup) => taskGroup.id === orderItem.taskId)
      )
      .filter((v): v is NonNullable<typeof v> => v != null);
    const remainedTaskGroups = taskGroups
      .filter((taskGroup) => {
        return !sortedByOrder.find((v) => v.id === taskGroup.id);
      })
      .sort((v1, v2) => {
        return v1.createdAt - v2.createdAt;
      });
    return [...sortedByOrder, ...remainedTaskGroups];
  }

  private sortTasksByStatusAndOrder(
    tasks: Task[],
    tasksOrder: Board['tasksOrder']
  ): Tasks {
    // tasksOrderに従ってソート、tasksOrderに存在しない場合はcreatedAtによる昇順ソート
    if (tasksOrder.length > 0) {
      const getOrder: (task: Task) => number = (task) =>
        tasksOrder.findIndex((order) => order.taskId === task.id);
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
}

type Tasks = { [key in Status]: Task[] };
