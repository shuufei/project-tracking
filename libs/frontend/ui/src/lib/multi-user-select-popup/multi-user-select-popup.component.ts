import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState, stateful } from '@rx-angular/state';
import { combineLatest, Subject } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';
import { User } from '../user-select-popup/user-select-popup.component';

type State = {
  users: User[];
  selectedUserIds: User['id'][];
  searchWord?: string;
};

@Component({
  selector: 'ui-multi-user-select-popup',
  templateUrl: './multi-user-select-popup.component.html',
  styleUrls: ['./multi-user-select-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class MultiUserSelectPopupComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set users(value: User[]) {
    this.state.set('users', () => value);
  }
  @Input()
  set selectedUserIds(value: User['id'][]) {
    this.state.set('selectedUserIds', () => value);
  }
  @Output() selectUsers = new EventEmitter<User['id'][]>();

  // State
  readonly state$ = this.state.select();
  readonly users$ = this.state.select('users');
  readonly isShowResetButton$ = this.state
    .select('selectedUserIds')
    .pipe(stateful(map((userIds) => userIds.length >= 1)));
  readonly filteredUsers$ = combineLatest([
    this.users$,
    this.state.$.pipe(pluck('searchWord'), startWith(undefined)),
  ]).pipe(
    stateful(
      map(([users, searchWord]) =>
        users.filter((user) =>
          searchWord ? user.name.includes(searchWord) : true
        )
      )
    )
  );

  // Events
  readonly onClickedUser$ = new Subject<User['id']>();
  readonly onClickedReset$ = new Subject<void>();
  readonly onInputedSearchWord$ = new Subject<string>();

  constructor(private state: RxState<State>) {
    this.state.set({
      users: [],
      selectedUserIds: [],
    });
  }

  ngOnInit(): void {
    this.state.connect(this.onClickedUser$, (state, userId) => {
      const userIds = state.selectedUserIds.find((v) => v === userId)
        ? state.selectedUserIds.filter((v) => v !== userId)
        : [...state.selectedUserIds, userId];
      return {
        ...state,
        selectedUserIds: userIds,
      };
    });
    this.state.connect(this.onClickedReset$, (state) => ({
      ...state,
      selectedUserIds: [],
    }));
    this.state.connect(this.onInputedSearchWord$, (state, searchWord) => ({
      ...state,
      searchWord: searchWord || undefined,
    }));
    this.state.hold(this.state.select('selectedUserIds'), (ids) => {
      this.selectUsers.emit(ids);
    });
  }

  isSelected(userId: User['id']) {
    const selectedUserIds = this.state.get('selectedUserIds');
    return selectedUserIds.includes(userId);
  }
}
