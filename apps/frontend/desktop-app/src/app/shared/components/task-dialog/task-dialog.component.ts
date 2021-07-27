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
  IUpdateTaskUsecase,
  UPDATE_TASK_USECASE,
} from '@bison/frontend/application';
import { Task } from '@bison/frontend/domain';
import { Board, User } from '@bison/shared/domain';
import { UpdateTaskInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import { exhaustMap, filter, map } from 'rxjs/operators';
import { convertToApiStatusFromDomainStatus } from '../../../util/convert-to-api-status-from-domain-status';

const USER_FIELDS = gql`
  fragment UserPartsInTaskDialog on User {
    id
    name
    icon
  }
`;

type State = {
  task?: Task;
  isOpenDialog: boolean;
  users: User[];
  isEditableTitleAndDesc: boolean;
  editState?: {
    title: Task['title'];
    description: Task['description'];
  };
};

@Component({
  selector: 'bis-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() isOpen$ = new Subject<boolean>();
  @Input() set task(value: Task) {
    this.state.set('task', () => value);
  }

  readonly boards: Board[] = [
    {
      id: 'board0001',
      name: 'board 0001',
      description:
        'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
      projectId: 'project0001',
      tasksOrder: [],
    },
    {
      id: 'board0002',
      name: 'board 0002',
      description:
        'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
      projectId: 'project0001',
      tasksOrder: [],
    },
    {
      id: 'board0003',
      name: 'backlog',
      description:
        'プロジェクト管理サービスの開発。\nプロジェクト管理サービスの開発。',
      projectId: 'project0001',
      tasksOrder: [],
    },
  ];

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenDialog$ = this.state.select('isOpenDialog');

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onOpenedDialog$ = new Subject<void>();
  readonly onClosedDialog$ = new Subject<void>();
  readonly onClickedEditTitleAndDescButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescCancelButton$ = new Subject<void>();
  readonly onClickedUpdateTitleAndDescButton$ = new Subject<void>();
  readonly onChangedTitle$ = new Subject<Task['title']>();
  readonly onChangedDescription$ = new Subject<Task['description']>();
  readonly onChangedAssignUser$ = new Subject<User['id']>();
  readonly onChangedStatus$ = new Subject<Task['status']>();
  readonly onChangedBoard$ = new Subject<Board['id']>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    @Inject(UPDATE_TASK_USECASE) private updateTaskUsecase: IUpdateTaskUsecase
  ) {
    this.state.set({
      isOpenDialog: false,
      users: [],
      isEditableTitleAndDesc: false,
    });
  }

  ngOnInit(): void {
    this.state.connect('isOpenDialog', this.onClickedCloseButton$, () => false);
    this.state.connect('isOpenDialog', this.onOpenedDialog$, () => true);
    this.state.connect('isOpenDialog', this.onClosedDialog$, () => false);
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
    this.state.hold(
      this.onClickedUpdateTitleAndDescButton$.pipe(
        exhaustMap(() => {
          return this.updateTitleAndDescription();
        })
      )
    );
    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('task')?.assignUser?.id;
        }),
        exhaustMap((id) => {
          return this.updateAssignUser(id);
        })
      )
    );
    this.state.hold(
      this.onChangedStatus$.pipe(
        filter((status) => {
          return status !== this.state.get('task')?.status;
        }),
        exhaustMap((status) => {
          return this.updateStatus(status);
        })
      )
    );
    this.state.hold(
      this.onChangedBoard$.pipe(
        filter((boardId) => {
          return boardId !== this.state.get('task')?.board.id;
        }),
        exhaustMap((boardId) => {
          return this.updateBoard(boardId);
        })
      )
    );
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers(
          { name: 'UserPartsInTaskDialog', fields: USER_FIELDS },
          { fetchPolicy: 'cache-only' }
        )
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

    /**
     * TODO:
     * - タスクグループ詳細表示
     * - 削除確認、削除実施
     * - サブタスク詳細表示
     * - サブタスク追加
     * - サブタスクの並び替え
     * - トラッキング開始
     * - トラッキング時間、作業予定時間更新
     */
  }

  private updateTitleAndDescription() {
    const state = this.state.get();
    const task = state.task;
    const editState = state.editState;
    if (task == null || editState == null) {
      return of(undefined);
    }
    const input: UpdateTaskInput = {
      id: task.id,
      title: editState.title,
      description: editState.description,
      status: convertToApiStatusFromDomainStatus(task.status),
      assignUserId: task.assignUser?.id,
      workTimeSec: task.workTimeSec,
      scheduledTimeSec: task.scheduledTimeSec,
      boardId: task.board.id,
      subtasksOrder: task.subtasksOrder,
      taskGroupId: task.taskGroup?.id,
    };
    return this.updateTaskUsecase.execute(input);
  }

  private updateAssignUser(userId: User['id']) {
    const state = this.state.get();
    const task = state.task;
    if (task == null) {
      return of(undefined);
    }
    const input: UpdateTaskInput = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: convertToApiStatusFromDomainStatus(task.status),
      assignUserId: userId,
      workTimeSec: task.workTimeSec,
      scheduledTimeSec: task.scheduledTimeSec,
      boardId: task.board.id,
      subtasksOrder: task.subtasksOrder,
      taskGroupId: task.taskGroup?.id,
    };
    return this.updateTaskUsecase.execute(input);
  }

  private updateStatus(status: Task['status']) {
    const task = this.state.get('task');
    if (task == null) {
      return of(undefined);
    }
    const input: UpdateTaskInput = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: convertToApiStatusFromDomainStatus(status),
      assignUserId: task.assignUser?.id,
      workTimeSec: task.workTimeSec,
      scheduledTimeSec: task.scheduledTimeSec,
      boardId: task.board.id,
      subtasksOrder: task.subtasksOrder,
      taskGroupId: task.taskGroup?.id,
    };
    return this.updateTaskUsecase.execute(input);
  }

  private updateBoard(boardId: Board['id']) {
    const task = this.state.get('task');
    if (task == null) {
      return of(undefined);
    }
    const input: UpdateTaskInput = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: convertToApiStatusFromDomainStatus(task.status),
      assignUserId: task.assignUser?.id,
      workTimeSec: task.workTimeSec,
      scheduledTimeSec: task.scheduledTimeSec,
      boardId: boardId,
      subtasksOrder: task.subtasksOrder,
      taskGroupId: task.taskGroup?.id,
    };
    return this.updateTaskUsecase.execute(input);
  }
}
