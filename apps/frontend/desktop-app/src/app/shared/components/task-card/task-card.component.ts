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
import { Task } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { of, Subject } from 'rxjs';
import {
  exhaustMap,
  filter,
  map,
  pairwise,
  startWith,
  tap,
} from 'rxjs/operators';
import { TaskFacadeService } from '../../facade/task-facade/task-facade.service';

const USER_FIELDS = gql`
  fragment UserPartsInTaskCard on User {
    id
    name
    icon
  }
`;

type State = {
  task?: Task;
  isHovered: boolean;
  users: User[];
};

@Component({
  selector: 'bis-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskCardComponent implements OnInit {
  @Input()
  set task(value: Task) {
    this.state.set('task', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onHover$ = new Subject<boolean>();
  readonly onChangedAssignUser$ = new Subject<User['id'] | undefined>();
  readonly onClickedPlay$ = new Subject<void>();
  readonly onClickedPause$ = new Subject<void>();
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onDelete$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskFacadeService: TaskFacadeService
  ) {
    this.state.set({
      isHovered: false,
      users: [],
    });
  }

  ngOnInit(): void {
    this.state.connect('isHovered', this.onHover$.asObservable());
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers({
          fields: USER_FIELDS,
          name: 'UserPartsInTaskCard',
        })
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
      this.onChangedAssignUser$.pipe(
        filter((id) => {
          return id !== this.state.get('task')?.assignUser?.id;
        }),
        exhaustMap((id) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateAssignUser(id, task);
        })
      )
    );
    this.state.hold(
      this.onClickedPlay$.pipe(
        exhaustMap(() => {
          const now = new Date();
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  workStartDateTimestamp: now.valueOf(),
                };
          });
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.startTracking(now, task);
        })
      )
    );
    this.state.hold(
      this.onClickedPause$.pipe(
        exhaustMap(() => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          const start = task.workStartDateTimestamp;
          const currentWorkTimeSec = task.workTimeSec;
          if (start == null || currentWorkTimeSec == null) return of(undefined);
          const now = new Date();
          const diffTimeMilliSec = now.valueOf() - start;
          const updatedWorkTimeSec =
            currentWorkTimeSec + Math.ceil(diffTimeMilliSec / 1000);
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  workTimeSec: updatedWorkTimeSec,
                  workStartDateTimestamp: undefined,
                };
          });
          return this.taskFacadeService.stopTracking(now, task);
        })
      )
    );
    this.state.hold(
      this.onChangedWorkTimeSec$.pipe(
        startWith(this.state.get('task')?.workTimeSec ?? 0),
        pairwise(),
        filter(([prev, sec]) => {
          const diff = sec - prev;
          const isChangedByCtrlBtn = diff > 1;
          const isTracking =
            this.state.get('task')?.workStartDateTimestamp != null;
          return isChangedByCtrlBtn || !isTracking;
        }),
        map(([, current]) => current),
        filter((sec) => {
          return sec !== this.state.get('task')?.workTimeSec;
        }),
        exhaustMap((sec) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          const workStartDateTimestamp =
            task.workStartDateTimestamp && new Date().valueOf();
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  workTimeSec: sec,
                  workStartDateTimestamp,
                };
          });
          return this.taskFacadeService.updateWorkTimeSec(
            sec,
            workStartDateTimestamp,
            task
          );
        })
      )
    );
    this.state.hold(
      this.onChangedScheduledTimeSec$.pipe(
        filter((sec) => {
          return sec !== this.state.get('task')?.scheduledTimeSec;
        }),
        tap((sec) => {
          this.state.set('task', (state) => {
            const task = state.task;
            return task == null
              ? task
              : {
                  ...task,
                  scheduledTimeSec: sec,
                };
          });
        }),
        exhaustMap((sec) => {
          const task = this.state.get('task');
          if (task == null) return of(undefined);
          return this.taskFacadeService.updateScheduledTimeSec(sec, task);
        })
      )
    );
  }
}
