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
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Board, Task, TaskGroup as UiTaskGroup } from '@bison/frontend/domain';
import { Id, Status } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  BOARD_FIELDS,
  BOARD_FRAGMENT_NAME,
} from '../../../../shared/fragments/board-fragment';
import { convertToDomainBoardFromApiBoard } from '../../../../util/convert-to-domain-board-from-api-board';

type State = {
  board?: Board;
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
  // TODO: stateに移動
  taskGroups: TaskGroup[] = [];
  soloTasks: Tasks = { TODO: [], INPROGRESS: [], CONFIRM: [], DONE: [] };
  readonly state$ = this.state.select();

  private readonly onInit$ = new Subject();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({});
  }

  ngOnInit() {
    this.onInit$.next();
    this.setupEventHandler();
  }

  drop(event: CdkDragDrop<Task[]>) {
    //FIXME: 他のタスクグループにも移動できてしまう。

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // TODO: タスクの順番更新
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // TODO: タスクのステータス更新
    }
  }

  trackById(_: number, item: { id: Id }) {
    return item.id;
  }

  // keyvalueパイプが勝手にソートするのを防ぐ
  noOpCompare() {
    return 0;
  }

  private setupEventHandler() {
    this.state.connect(
      'board',
      this.apolloDataQuery
        .queryBoard(
          {
            name: BOARD_FRAGMENT_NAME,
            fields: BOARD_FIELDS,
          },
          'boardId'
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
            this.taskGroups =
              board?.taskGroups.map((v) => ({
                ...v,
                tasks: this.sortTasksByStatus(v.tasks),
              })) ?? [];

            this.soloTasks = this.sortTasksByStatus(board?.soloTasks ?? []);
          })
        )
    );
  }

  private sortTasksByStatus(tasks: Task[]): Tasks {
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

type TaskGroup = Pick<
  UiTaskGroup,
  'id' | 'title' | 'status' | 'assignUser' | 'scheduledTimeSec'
> & { tasks: Tasks };
