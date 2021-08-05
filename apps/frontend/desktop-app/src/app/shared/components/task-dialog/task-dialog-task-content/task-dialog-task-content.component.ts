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
  IUpdateTaskUsecase,
  UPDATE_TASK_USECASE,
} from '@bison/frontend/application';
import { Task } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { Board } from '@bison/shared/domain';
import { UpdateTaskInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import { exhaustMap, filter, map, tap } from 'rxjs/operators';
import { convertToApiStatusFromDomainStatus } from '../../../../util/convert-to-api-status-from-domain-status';
import { TaskDialogService } from '../task-dialog.service';

const USER_FIELDS = gql`
  fragment UserPartsInTaskDialog on User {
    id
    name
    icon
  }
`;

type State = {
  task?: Task;
  isEditableTitleAndDesc: boolean;
  editState?: {
    title: Task['title'];
    description: Task['description'];
  };
  users: User[];
};

@Component({
  selector: 'bis-task-dialog-task-content',
  templateUrl: './task-dialog-task-content.component.html',
  styleUrls: ['./task-dialog-task-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogTaskContentComponent implements OnInit {
  @Input()
  set task(value: Task) {
    this.state.set('task', () => value);
  }

  // TODO: Apollo Clientから取得
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

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescCancelButton$ = new Subject<void>();
  readonly onClickedUpdateTitleAndDescButton$ = new Subject<void>();
  readonly onChangedTitle$ = new Subject<Task['title']>();
  readonly onChangedDescription$ = new Subject<Task['description']>();
  readonly onChangedAssignUser$ = new Subject<User['id']>();
  readonly onChangedStatus$ = new Subject<Task['status']>();
  readonly onChangedBoard$ = new Subject<Board['id']>();
  readonly onDrop$ = new Subject<CdkDragDrop<Task['subtasks']>>();
  readonly onClickedTaskGroup$ = new Subject<void>();
  readonly onClickedSubtask$ = new Subject<Task['subtasks'][number]>();

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    @Inject(UPDATE_TASK_USECASE) private updateTaskUsecase: IUpdateTaskUsecase
  ) {
    this.state.set({
      isEditableTitleAndDesc: false,
      users: [],
    });
  }

  ngOnInit(): void {
    /**
     * TODO:
     * - タスクグループ詳細表示
     * - 削除確認、削除実施
     * - サブタスク詳細表示
     * - サブタスク追加
     * - トラッキング開始
     * - トラッキング時間、作業予定時間更新
     */
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

    this.state.hold(this.onClickedCloseButton$, () => {
      this.taskDialogService.close();
    });
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
          return this.updateSubtasksOrder(subtasks.map((v) => v.id));
        })
      )
    );
    this.state.hold(this.onClickedTaskGroup$, () => {
      const task = this.state.get('task');
      if (task == null || task?.taskGroup == null) return;
      this.taskDialogService.pushContent(task.taskGroup);
    });
    this.state.hold(this.onClickedSubtask$, (subtask) => {
      this.taskDialogService.pushContent(subtask);
    });
  }

  private updateTitleAndDescription() {
    const state = this.state.get();
    const editState = state.editState;
    if (editState == null) {
      return of(undefined);
    }
    const input = this.generateUpdateTaskInput({
      title: editState.title,
      description: editState.description,
    });
    if (input == null) return of(undefined);
    return this.updateTaskUsecase.execute(input);
  }

  private updateAssignUser(userId: User['id']) {
    const input = this.generateUpdateTaskInput({ assignUserId: userId });
    if (input == null) return of(undefined);
    return this.updateTaskUsecase.execute(input);
  }

  private updateStatus(status: Task['status']) {
    const input = this.generateUpdateTaskInput({
      status: convertToApiStatusFromDomainStatus(status),
    });
    if (input == null) return of(undefined);
    return this.updateTaskUsecase.execute(input);
  }

  private updateBoard(boardId: Board['id']) {
    const input = this.generateUpdateTaskInput({ boardId });
    if (input == null) return of(undefined);
    return this.updateTaskUsecase.execute(input);
  }

  private updateSubtasksOrder(subtasksOrder: Task['subtasksOrder']) {
    const input = this.generateUpdateTaskInput({ subtasksOrder });
    if (input == null) return of(undefined);
    return this.updateTaskUsecase.execute(input);
  }

  private generateUpdateTaskInput(updateValue: Partial<UpdateTaskInput>) {
    const task = this.state.get('task');
    if (task == null) {
      return undefined;
    }
    const input: UpdateTaskInput = {
      id: task.id,
      title: updateValue.title ?? task.title,
      description: updateValue.description ?? task.description,
      status:
        updateValue.status ?? convertToApiStatusFromDomainStatus(task.status),
      assignUserId: updateValue.assignUserId ?? task.assignUser?.id,
      workTimeSec: updateValue.workTimeSec ?? task.workTimeSec,
      scheduledTimeSec: updateValue.scheduledTimeSec ?? task.scheduledTimeSec,
      boardId: updateValue.boardId ?? task.board.id,
      subtasksOrder: updateValue.subtasksOrder ?? task.subtasksOrder,
      taskGroupId: updateValue.taskGroupId ?? task.taskGroup?.id,
    };
    return input;
  }
}
