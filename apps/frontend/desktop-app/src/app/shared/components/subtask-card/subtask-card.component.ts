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
import { Subtask, User } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const USER_FIELDS = gql`
  fragment UserPartsInSubtaskCard on User {
    id
    name
    icon
  }
`;

type State = {
  subtask?: Subtask;
  users: User[];
};

@Component({
  selector: 'bis-subtask-card',
  templateUrl: './subtask-card.component.html',
  styleUrls: ['./subtask-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SubtaskCardComponent implements OnInit {
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
  readonly onChangedWorkTimeSec$ = new Subject<number>();
  readonly onChangedScheduledTimeSec$ = new Subject<number>();
  readonly onChangedCheck$ = new Subject<boolean>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({ users: [] });
  }

  ngOnInit(): void {
    this.state.connect(
      'subtask',
      this.onChangedWorkTimeSec$,
      (state, workTimeSec) => {
        if (state.subtask == null) {
          return state.subtask;
        }
        return {
          ...state.subtask,
          workTimeSec,
        };
      }
    );
    this.state.connect(
      'subtask',
      this.onChangedScheduledTimeSec$,
      (state, scheduledTimeSec) => {
        if (state.subtask == null) {
          return state.subtask;
        }
        return {
          ...state.subtask,
          scheduledTimeSec,
        };
      }
    );
    this.state.connect('subtask', this.onChangedCheck$, (state, checked) => {
      if (state.subtask == null) {
        return state.subtask;
      }
      return {
        ...state.subtask,
        isDone: checked,
      };
    });
    this.state.connect(
      'users',
      this.apolloDataQuery
        .queryUsers(
          { name: 'UserPartsInSubtaskCard', fields: USER_FIELDS },
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
     *   - 削除処理
     *   - 更新処理(isDone, assign, shceudledTimeSec, workTimeSec, isTracking)
     *   - 詳細ダイアログ表示
     */
  }
}
