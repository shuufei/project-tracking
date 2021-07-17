import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Color, Project } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  name: Project['name'];
  description: Project['description'];
  color: Color;
};

export type ChangedPropertyEvent = Pick<
  State,
  'name' | 'description' | 'color'
>;

@Component({
  selector: 'bis-project-property-edit-form',
  templateUrl: './project-property-edit-form.component.html',
  styleUrls: ['./project-property-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectPropertyEditFormComponent implements OnInit {
  @Input()
  set name(value: State['name']) {
    this.state.set('name', () => value);
  }
  @Input()
  set description(value: State['description']) {
    this.state.set('description', () => value);
  }
  @Input()
  set color(value: State['color']) {
    this.state.set('color', () => value);
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
  readonly onChangedColor$ = new Subject<State['color']>();

  constructor(private readonly state: RxState<State>) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.connect('name', this.onChangedName$);
    this.state.connect('description', this.onChangedDescription$);
    this.state.connect('color', this.onChangedColor$);
    this.state.hold(this.state$, (state) => {
      this.changed.emit(state);
    });
  }
}
