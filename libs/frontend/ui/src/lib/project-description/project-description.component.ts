import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Color } from '@bison/shared/domain';
import { COLOR } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';

type State = {
  title: string;
  color: Color;
  description: string;
};

@Component({
  selector: 'ui-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDescriptionComponent {
  @Input()
  set title(value: string) {
    this.state.set('title', () => value);
  }
  @Input()
  set color(value: Color) {
    this.state.set('color', () => value);
  }
  @Input()
  set description(value: string) {
    this.state.set('description', () => value);
  }

  // State
  readonly state$ = this.state.select();

  constructor(private state: RxState<State>) {
    this.state.set({
      title: '',
      color: COLOR.Gray,
      description: ''
    });
  }
}
