import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { COLOR, Color } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';

type State = {
  title: string;
  color: Color;
  description: string;
};

@Component({
  selector: 'bis-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDetailComponent {
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
