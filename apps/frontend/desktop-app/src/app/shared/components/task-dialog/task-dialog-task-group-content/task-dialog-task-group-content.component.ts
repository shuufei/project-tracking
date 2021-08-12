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
import { Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
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

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({
      users: [],
      boards: [],
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

    this.state.hold(this.onClickedCloseButton$, () => {
      this.taskDialogService.close();
    });
    this.state.hold(this.onClickedBackButton$, () => {
      this.taskDialogService.back();
    });
  }
}
