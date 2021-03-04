import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import type { Color } from '@bison/shared/domain';
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

  readonly colors: Color[] = [
    'red',
    'blue',
    'green',
    'yellow',
    'brown',
    'pink',
    'gray',
  ];

  readonly colorNames: { [k in Color]: string } = {
    red: 'レッド',
    blue: 'ブルー',
    green: 'グリーン',
    yellow: 'イエロー',
    brown: 'ブラウン',
    pink: 'ピンク',
    gray: 'グレー',
  };

  constructor(private state: RxState<State>) {
    this.state.connect('currentColor', this.onClickedColor$);
    this.state.hold(this.onClickedColor$, (color) =>
      this.changedColor.emit(color)
    );
  }
}
