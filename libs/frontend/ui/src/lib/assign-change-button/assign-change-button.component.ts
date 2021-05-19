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
import { map } from 'rxjs/operators';
import type { User } from '../user-select-popup/user-select-popup.component';

type State = {
  users: User[];
  selectedUserIds: User['id'][];
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
  set selectedUserIds(value: User['id'][]) {
    this.state.set('selectedUserIds', () => value);
  }
  @Output() selectedUsers = new EventEmitter<User['id'][]>();

  // State
  readonly state$ = this.state.select();
  readonly selectedUserImageSrcList$ = combineLatest([
    this.state.select('users'),
    this.state.select('selectedUserIds'),
  ]).pipe(
    map(([users, ids]) =>
      users.filter((user) => ids.includes(user.id)).map((user) => user.imageSrc)
    )
  );

  // Events
  readonly onChangedSelectedUserIds$ = new Subject<User['id'][]>();

  constructor(private state: RxState<State>) {
    this.state.set({
      users: [],
      selectedUserIds: [],
    });
  }

  ngOnInit() {
    this.state.connect('selectedUserIds', this.onChangedSelectedUserIds$);
    this.state.hold(this.state.select('selectedUserIds'), (userIds) => {
      this.selectedUsers.emit(userIds);
    });
  }
}
