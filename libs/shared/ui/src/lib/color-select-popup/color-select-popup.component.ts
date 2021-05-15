import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import type { Color } from '@bison/shared/domain';
import { COLOR } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

type State = {
  currentColor?: Color;
};

@Component({
  selector: 'ui-color-select-popup',
  templateUrl: './color-select-popup.component.html',
  styleUrls: ['./color-select-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ColorSelectPopupComponent {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set currentColor(value: Color) {
    this.state.set({ currentColor: value });
  }
  @Output() changedColor = new EventEmitter<Color>();

  readonly currentColor$ = this.state.select('currentColor');

  readonly onClickedColor$ = new Subject<Color>();

  readonly colors = Object.values(COLOR);

  readonly colorNames: { [k in Color]: string } = {
    Red: 'レッド',
    Blue: 'ブルー',
    Green: 'グリーン',
    Yellow: 'イエロー',
    Brown: 'ブラウン',
    Pink: 'ピンク',
    Gray: 'グレー',
  };

  constructor(private state: RxState<State>) {
    this.state.connect('currentColor', this.onClickedColor$);
    this.state.hold(this.onClickedColor$, (color) =>
      this.changedColor.emit(color)
    );
  }
}
