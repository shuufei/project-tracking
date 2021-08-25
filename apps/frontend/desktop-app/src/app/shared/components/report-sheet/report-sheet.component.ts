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
import { Board, Task, TaskGroup } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { convertToDomainBoardFromApiBoard } from '../../../util/convert-to-domain-board-from-api-board';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import {
  BOARD_FIELDS,
  BOARD_FRAGMENT_NAME,
} from '../../fragments/board-fragment';

type State = {
  boardId: Board['id'];
  board: Board;
};

type TaskReportList = (
  | { item: Task; type: 'task' }
  | { item: TaskGroup; type: 'taskGroup' }
)[];

@Component({
  selector: 'bis-report-sheet',
  templateUrl: './report-sheet.component.html',
  styleUrls: ['./report-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ReportSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set boardId(value: State['boardId']) {
    this.state.set('boardId', () => value);
  }

  readonly state$ = this.state.select();
  readonly taskReportList$: Observable<TaskReportList> = this.state
    .select('board')
    .pipe(
      map((board) => {
        const taskReprotList: TaskReportList = board.tasksOrder
          .map((orderItem) => {
            const item =
              orderItem.type === 'Task'
                ? board.soloTasks.find((v) => v.id === orderItem.taskId)
                : board.taskGroups.find((v) => v.id === orderItem.taskId);
            const type: TaskReportList[number]['type'] =
              orderItem.type === 'Task' ? 'task' : 'taskGroup';
            return (
              item && {
                item,
                type,
              }
            );
          })
          .filter((v): v is TaskReportList[number] => v != null);
        const remainedTaskGroups: TaskReportList = board.taskGroups
          .filter((taskGroup) => {
            return !taskReprotList.find((v) => v.item.id === taskGroup.id);
          })
          .map((taskGroup) => ({ item: taskGroup, type: 'taskGroup' }));
        const remainedTasks: TaskReportList = board.soloTasks
          .filter((task) => {
            return !taskReprotList.find((v) => v.item.id === task.id);
          })
          .map((task) => ({ item: task, type: 'task' }));
        return [...taskReprotList, ...remainedTaskGroups, ...remainedTasks];
      })
    );

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {}

  ngOnInit(): void {
    this.state.connect(
      'board',
      this.state.select('boardId').pipe(
        switchMap((boardId) => {
          return this.queryBoard(boardId);
        })
      )
    );
  }

  private queryBoard(boardId: Board['id']): Observable<Board> {
    return this.apolloDataQuery
      .queryBoard(
        {
          fields: BOARD_FIELDS,
          name: BOARD_FRAGMENT_NAME,
        },
        boardId,
        { fetchPolicy: 'cache-first', nextFetchPolicy: 'cache-only' }
      )
      .pipe(
        map((res) => {
          return res.data.board;
        }),
        nonNullable(),
        map((board) => {
          return convertToDomainBoardFromApiBoard(board);
        })
      );
  }
}
