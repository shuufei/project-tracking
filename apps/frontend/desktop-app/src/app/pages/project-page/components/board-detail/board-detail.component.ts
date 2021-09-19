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
import { Board, Subtask, Task, TaskGroup } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { Id, Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TaskDialogService } from '../../../../shared/components/task-dialog/task-dialog.service';
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

  readonly onClickTaskGroup$ = new Subject<TaskGroup['id']>();
  readonly onClickTask$ = new Subject<Task['id']>();
  readonly onClickSubask$ = new Subject<Subtask['id']>();

  constructor(
    private state: RxState<State>,
    private route: ActivatedRoute,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskDialogService: TaskDialogService
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
              this.state.set('taskGroups', () => board.taskGroups);
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
