import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { isTaskGroup, TaskGroup } from '@bison/frontend/domain';
import { Board, User } from '@bison/frontend/ui';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { TaskGroupFacadeService } from '../../../facade/task-group-facade/task-group-facade.service';
import { TaskDialogService } from '../task-dialog.service';

const PROJECT_FIELDS = gql`
  fragment ProjectPartsInTaskGroupDialog on Project {
    id
    boards {
      id
      name
    }
  }
`;

const USER_FIELDS = gql`
  fragment UserPartsInTaskGroupDialog on User {
    id
    name
    icon
  }
`;

type State = {
  taskGroup?: TaskGroup;
  users: User[];
  boards: Board[];
  isEditableTitleAndDesc: boolean;
  editState?: {
    title: TaskGroup['title'];
    description: TaskGroup['description'];
  };
};

@Component({
  selector: 'bis-task-dialog-task-group-content',
  templateUrl: './task-dialog-task-group-content.component.html',
  styleUrls: ['./task-dialog-task-group-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogTaskGroupContentComponent implements OnInit {
  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly existsDialogPrevContent$ = this.taskDialogService.existsPrevContent$;

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onClickedBackButton$ = new Subject<void>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onChangedStatus$ = new Subject<TaskGroup['status']>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onChangedBoard$ = new Subject<Board['id']>();
  readonly onClickedEditTitleAndDescButton$ = new Subject<void>();
  readonly onClickedEditTitleAndDescCancelButton$ = new Subject<void>();
  readonly onClickedUpdateTitleAndDescButton$ = new Subject<void>();
  readonly onChangedTitle$ = new Subject<TaskGroup['title']>();
  readonly onChangedDescription$ = new Subject<TaskGroup['description']>();
  readonly onDrop$ = new Subject<CdkDragDrop<TaskGroup['tasks']>>();

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskGroupFacade: TaskGroupFacadeService
  ) {
    this.state.set({
      users: [],
      boards: [],
      isEditableTitleAndDesc: false,
    });
  }

  ngOnInit(): void {
    this.state.connect(
      'taskGroup',
      this.taskDialogService.currentContent$.pipe(
        filter((v): v is TaskGroup => isTaskGroup(v)),
        tap((v) => console.log(v))
      )
    );
    this.state.connect(
      'boards',
      this.state.select('taskGroup').pipe(
        map((v) => v?.board.projectId),
        filter((v): v is NonNullable<typeof v> => v != null),
        switchMap((projectId) => {
          return this.apolloDataQuery.queryProject(
            {
              fields: PROJECT_FIELDS,
              name: 'ProjectPartsInTaskGroupDialog',
            },
            projectId,
            {
              fetchPolicy: 'cache-first',
            }
          );
        }),
        map((v) => v.data.project),
        filter((v): v is NonNullable<typeof v> => v != null),
        map((project) => {
          return project.boards.map((board) => {
            return {
              id: board.id,
              name: board.name,
            };
          });
        })
      )
    );
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers(
          { fields: USER_FIELDS, name: 'UserPartsInTaskGroupDialog' },
          { fetchPolicy: 'cache-first' }
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
    this.state.connect(this.onClickedEditTitleAndDescButton$, (state) => {
      return {
        ...state,
        isEditableTitleAndDesc: true,
        editState: {
          title: state.taskGroup?.title ?? '',
          description: state.taskGroup?.description,
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
    this.state.hold(this.onClickedBackButton$, () => {
      this.taskDialogService.back();
    });
    this.state.hold(
      this.onChangedStatus$.pipe(
        filter((status) => {
          return status !== this.state.get('taskGroup')?.status;
        }),
        tap((status) => {
          this.state.set('taskGroup', ({ taskGroup }) => {
            if (taskGroup == null) return taskGroup;
            return {
              ...taskGroup,
              status,
            };
          });
        }),
        exhaustMap((status) => {
          const taskGroup = this.state.get('taskGroup');
          if (taskGroup == null) return of(undefined);
          return this.taskGroupFacade.updateStatus(status, taskGroup);
        })
      )
    );
    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('taskGroup')?.assignUser?.id;
        }),
        exhaustMap((id) => {
          const taskGroup = this.state.get('taskGroup');
          if (taskGroup == null) return of(undefined);
          return this.taskGroupFacade.updateAssignUser(id, taskGroup);
        })
      )
    );
    this.state.hold(
      this.onChangedBoard$.pipe(
        filter((boardId) => {
          return boardId !== this.state.get('taskGroup')?.board.id;
        }),
        exhaustMap((boardId) => {
          const taskGroup = this.state.get('taskGroup');
          if (taskGroup == null) return of(undefined);
          return this.taskGroupFacade.updateBoard(boardId, taskGroup);
        })
      )
    );
    this.state.hold(
      this.onClickedUpdateTitleAndDescButton$.pipe(
        tap(() => {
          this.state.set('taskGroup', (state) => {
            if (state.editState == null || state.taskGroup == null)
              return state.taskGroup;
            return {
              ...state.taskGroup,
              title: state.editState.title,
              description: state.editState.description,
            };
          });
        }),
        exhaustMap(() => {
          const taskGroup = this.state.get('taskGroup');
          const editState = this.state.get('editState');
          if (taskGroup == null || editState == null) return of(undefined);
          return this.taskGroupFacade.updateTitleAndDescription(
            editState.title,
            editState.description,
            taskGroup
          );
        })
      )
    );
    this.state.hold(
      this.onDrop$.pipe(
        map((dropEvent) => {
          const taskGroup = this.state.get('taskGroup');
          if (taskGroup == null) {
            return [];
          }
          const tasks = [...(taskGroup?.tasks ?? [])];
          moveItemInArray(
            tasks,
            dropEvent.previousIndex,
            dropEvent.currentIndex
          );
          return tasks;
        }),
        tap((tasks) => {
          const taskGroup = this.state.get('taskGroup');
          if (taskGroup == null) {
            return taskGroup;
          }
          const tasksOrder = tasks.map((v) => v.id);
          this.state.set('taskGroup', () => {
            return { ...taskGroup, tasks, tasksOrder };
          });
        }),
        exhaustMap((tasks) => {
          const taskGroup = this.state.get('taskGroup');
          if (taskGroup == null) {
            return of(undefined);
          }
          return this.taskGroupFacade.updateTasksOrder(
            tasks.map((v) => v.id),
            taskGroup
          );
        })
      )
    );
  }
}
