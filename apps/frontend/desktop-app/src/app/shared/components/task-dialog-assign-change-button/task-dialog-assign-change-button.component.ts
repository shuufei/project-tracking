import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

type State = {
  users: User[];
  selectedUserId?: User['id'];
};

@Component({
  selector: 'bis-task-dialog-assign-change-button',
  templateUrl: './task-dialog-assign-change-button.component.html',
  styleUrls: ['./task-dialog-assign-change-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TaskDialogAssignChangeButtonComponent implements OnInit {
  @Input()
  set users(value: User[]) {
    this.state.set('users', () => value);
  }
  @Input()
  set selectedUserId(value: User['id']) {
    this.state.set('selectedUserId', () => value);
  }
  @Output() selectedUser = new EventEmitter<User['id'] | undefined>();

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly selectedUser$ = combineLatest([
    this.state.select('users'),
    this.state.select('selectedUserId'),
  ]).pipe(map(([users, id]) => users.find((v) => v.id === id)));

  /**
   * Event
   */
  readonly onChangedSelectedUserId$ = new Subject<State['selectedUserId']>();

  constructor(private state: RxState<State>) {}

  ngOnInit(): void {
    this.state.set({
      users: [],
    });
    this.state.connect('selectedUserId', this.onChangedSelectedUserId$);
    this.state.hold(
      this.state.$.pipe(map((v) => v.selectedUserId)),
      (userId) => {
        this.selectedUser.emit(userId);
      }
    );
  }
}
