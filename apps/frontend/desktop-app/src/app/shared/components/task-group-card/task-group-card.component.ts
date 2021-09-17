import { CdkDragDrop } from '@angular/cdk/drag-drop';
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
import { Task, TaskGroup } from '@bison/frontend/domain';
import { User } from '@bison/frontend/ui';
import { Id } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { convertToDomainTaskGroupFromApiTaskGroup } from '../../../util/convert-to-domain-task-group-from-api-task-group';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import { TaskFacadeService } from '../../facade/task-facade/task-facade.service';
import { TaskGroupFacadeService } from '../../facade/task-group-facade/task-group-facade.service';
import {
  TASK_GROUP_FIELDS,
  TASK_GROUP_FRAGMENT_NAME,
} from '../../fragments/task-group-fragment';

const USER_FIELDS = gql`
  fragment UserPartsInTaskGroupCard on User {
    id
    name
    icon
  }
`;

type State = {
  taskGroupId?: TaskGroup['id'];
  taskGroup?: TaskGroup;
  users: User[];
};

@Component({
  selector: 'bis-task-group-card',
  templateUrl: './task-group-card.component.html',
  styleUrls: ['./task-group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskGroupCardComponent implements OnInit {
  @Input()
  set taskGroupId(value: State['taskGroupId']) {
    this.state.set('taskGroupId', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly todoTasks$ = this.state.select('taskGroup').pipe(
    nonNullable(),
    map((taskGroup) => {
      return taskGroup.tasks.filter((task) => task.status === 'TODO');
    })
  );
  readonly inprogressTasks$ = this.state.select('taskGroup').pipe(
    nonNullable(),
    map((taskGroup) => {
      return taskGroup.tasks.filter((task) => task.status === 'INPROGRESS');
    })
  );
  readonly confirmTasks$ = this.state.select('taskGroup').pipe(
    nonNullable(),
    map((taskGroup) => {
      return taskGroup.tasks.filter((task) => task.status === 'CONFIRM');
    })
  );
  readonly doneTasks$ = this.state.select('taskGroup').pipe(
    nonNullable(),
    map((taskGroup) => {
      return taskGroup.tasks.filter((task) => task.status === 'DONE');
    })
  );

  /**
   * Event
   */
  readonly onDrop$ = new Subject<
    [CdkDragDrop<Task[]>, TaskGroup | undefined]
  >();
  readonly onChangedTaskGroupStatus$ = new Subject<TaskGroup['status']>();
  readonly onChangedTaskGroupAssignUser$ = new Subject<User['id']>();
  readonly onChangedTaskGroupScheduledTime$ = new Subject<number>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    private taskGroupFacadeService: TaskGroupFacadeService,
    private taskFacadeService: TaskFacadeService
  ) {
    this.state.set({ users: [] });
  }

  ngOnInit(): void {
    this.state.connect('taskGroup', this.queryTaskGroup$());
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers({ fields: USER_FIELDS, name: 'UserPartsInTaskGroupCard' })
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
                imageSrc: user.icon,
              };
            });
          })
        )
    );

    this.state.hold(
      this.onChangedTaskGroupStatus$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        switchMap(([status, currentTaskGroup]) => {
          return this.taskGroupFacadeService.updateStatus(
            status,
            currentTaskGroup
          );
        })
      )
    );

    this.state.hold(
      this.onChangedTaskGroupAssignUser$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        filter(([id, taskGroup]) => id !== taskGroup.assignUser?.id),
        switchMap(([id, taskGroup]) => {
          return this.taskGroupFacadeService.updateAssignUser(id, taskGroup);
        })
      )
    );

    this.state.hold(
      this.onChangedTaskGroupScheduledTime$.pipe(
        withLatestFrom(this.state.select('taskGroup').pipe(nonNullable())),
        filter(([sec, taskGroup]) => sec !== taskGroup.scheduledTimeSec),
        switchMap(([timeSec, taskGroup]) => {
          return this.taskGroupFacadeService.updateScheduledTimeSec(
            timeSec,
            taskGroup
          );
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

  private queryTaskGroup$() {
    return this.state.select('taskGroupId').pipe(
      nonNullable(),
      switchMap((id) => {
        return this.apolloDataQuery.queryTaskGroup(
          { fields: TASK_GROUP_FIELDS, name: TASK_GROUP_FRAGMENT_NAME },
          id
        );
      }),
      map((response) => response.data.taskGroup),
      nonNullable(),
      map((taskGroup) => {
        return convertToDomainTaskGroupFromApiTaskGroup(taskGroup);
      })
    );
  }
}
