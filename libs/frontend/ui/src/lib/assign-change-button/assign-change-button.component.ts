import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';
import type { User } from '../user-select-popup/user-select-popup.component';

type State = {
  users: User[];
  selectedUserId?: User['id'];
};

@Component({
  selector: 'ui-assign-change-button',
  templateUrl: './assign-change-button.component.html',
  styleUrls: ['./assign-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class AssignChangeButtonComponent implements OnInit {
  @Input()
  set users(value: User[]) {
    this.state.set('users', () => value);
  }
  @Input()
  set selectedUserId(value: User['id'] | undefined) {
    this.state.set('selectedUserId', () => value);
  }
  @Output() selectedUser = new EventEmitter<User['id'] | undefined>();

  // State
  readonly state$ = this.state.select();
  readonly selectedUserImageSrc$ = combineLatest([
    this.state.select('users'),
    this.state.select('selectedUserId'),
  ]).pipe(map(([users, id]) => users.find((v) => v.id === id)?.imageSrc));

  // Events
  readonly onChangedSelectedUserId$ = new Subject<User['id']>();

  constructor(private state: RxState<State>) {
    this.state.set({
      users: [],
    });
  }

  ngOnInit() {
    this.state.connect('selectedUserId', this.onChangedSelectedUserId$);
    this.state.hold(
      this.state.$.pipe(
        startWith(this.state.get()),
        map((v) => v.selectedUserId),
        pairwise(),
        filter(([prev, current]) => prev !== current)
      ),
      ([, userId]) => {
        this.selectedUser.emit(userId);
      }
    );
  }
}
