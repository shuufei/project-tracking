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
    // TODO: 初期値修正
    this.state.set({
      title: 'Bison',
      color: COLOR.Gray,
      description: `プロジェクト管理アプリケーションの開発。
ボード管理、スケジュール管理、トラッキングの機能がメインとなる。`
    });
  }
}
