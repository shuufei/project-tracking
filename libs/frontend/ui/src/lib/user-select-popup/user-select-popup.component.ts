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

type State = {
  users: User[];
  selectedUserId?: User['id'];
  searchWord?: string;
};

@Component({
  selector: 'ui-user-select-popup',
  templateUrl: './user-select-popup.component.html',
  styleUrls: ['./user-select-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class UserSelectPopupComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set users(value: User[]) {
    this.state.set('users', () => value);
  }
  @Input()
  set selectedUserId(value: User['id']) {
    this.state.set('selectedUserId', () => value);
  }
  @Output() selectUser = new EventEmitter<User['id']>();

  // State
  readonly state$ = this.state.select();
  readonly users$ = this.state.select('users');
  readonly isShowResetButton$ = this.state
    .select('selectedUserId')
    .pipe(stateful(map((userId) => userId != null)));
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
    });
  }

  ngOnInit(): void {
    this.state.connect(this.onClickedUser$, (state, userId) => {
      return {
        ...state,
        selectedUserId: userId,
      };
    });
    this.state.connect(this.onClickedReset$, (state) => ({
      ...state,
      selectedUserId: undefined,
    }));
    this.state.connect(this.onInputedSearchWord$, (state, searchWord) => ({
      ...state,
      searchWord: searchWord || undefined,
    }));
    this.state.hold(this.state.select('selectedUserId'), (id) => {
      this.selectUser.emit(id);
    });
  }
}

export type User = {
  id: string;
  name: string;
  imageSrc?: string;
};
