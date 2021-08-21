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
import { exhaustMap, filter, map } from 'rxjs/operators';
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
  }
}
