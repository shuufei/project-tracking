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
import { Subtask, Task } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import { exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { convertToDomainTaskFromApiTask } from '../../../../util/convert-to-domain-task-from-api-task';
import { TaskDialogService } from '../task-dialog.service';

const USER_FIELDS = gql`
  fragment UserPartsInSubtaskDialog on User {
    id
    name
    icon
  }
`;

type State = {
  subtask?: Subtask;
  users: User[];
  parentTask?: Task;
};

@Component({
  selector: 'bis-task-dialog-subtask-content',
  templateUrl: './task-dialog-subtask-content.component.html',
  styleUrls: ['./task-dialog-subtask-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogSubtaskContentComponent implements OnInit {
  @Input()
  set subtask(value: Subtask) {
    this.state.set('subtask', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onClickedCloseButton$ = new Subject<void>();
  readonly onClickedBackButton$ = new Subject<void>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onClickedTask$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    private taskDialogService: TaskDialogService,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({ users: [] });
  }

  ngOnInit(): void {
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers(
          { name: 'UserPartsInSubtaskDialog', fields: USER_FIELDS },
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
    this.state.connect(
      'parentTask',
      this.state.select('subtask').pipe(
        filter((v): v is NonNullable<typeof v> => v != null),
        switchMap((subtask) => {
          return this.apolloDataQuery.queryTask(subtask.taskId, undefined, {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-only',
          });
        }),
        map((response) => {
          return response.data.task;
        }),
        filter((v): v is NonNullable<typeof v> => v != null),
        map((task) => {
          return convertToDomainTaskFromApiTask(task);
        })
      )
    );

    this.state.hold(this.onClickedCloseButton$, () => {
      this.taskDialogService.close();
    });
    this.state.hold(this.onClickedBackButton$, () => {
      this.taskDialogService.back();
    });
    this.state.hold(
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('subtask')?.assignUser?.id;
        }),
        exhaustMap((id) => {
          // TODO: 更新処理実装
          return of(id);
        })
      )
    );
  }
}
