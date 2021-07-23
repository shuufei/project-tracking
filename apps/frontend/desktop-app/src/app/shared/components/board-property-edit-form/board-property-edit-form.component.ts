import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Project } from '@bison/frontend/domain';
import { Board } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  name: Board['name'];
  description?: Board['description'];
  project: Project;
};

export type ChangedPropertyEvent = Pick<State, 'name' | 'description'>;

@Component({
  selector: 'bis-board-property-edit-form',
  templateUrl: './board-property-edit-form.component.html',
  styleUrls: ['./board-property-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardPropertyEditFormComponent implements OnInit {
  @Input()
  set name(value: State['name']) {
    this.state.set('name', () => value);
  }
  @Input()
  set description(value: State['description']) {
    this.state.set('description', () => value);
  }
  @Input()
  set project(value: State['project']) {
    this.state.set('project', () => value);
  }
  @Output() changed = new EventEmitter<ChangedPropertyEvent>();

  /**
   * State
   */
  readonly state$ = this.state.select();

  /**
   * Event
   */
  readonly onChangedName$ = new Subject<State['name']>();
  readonly onChangedDescription$ = new Subject<State['description']>();

  constructor(private state: RxState<State>) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.connect('name', this.onChangedName$);
    this.state.connect('description', this.onChangedDescription$);
    this.state.hold(this.state$, (state) => {
      this.changed.emit({
        name: state.name,
        description: state.description,
      });
    });
  }
}
