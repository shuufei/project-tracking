import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { fromEvent, Subject } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export type State = {
  isOpen: boolean;
};

@Component({
  selector: 'ui-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;

  readonly state$ = this.state.select();

  /**
   * Events
   */
  readonly onClickOverlay$ = new Subject();
  readonly onClickCloseButton$ = new Subject();

  constructor(private readonly state: RxState<State>) {}

  ngOnInit(): void {
    if (this.triggerEl == null) {
      return;
    }
    this.state.connect(
      'isOpen',
      fromEvent(this.triggerEl, 'click').pipe(mapTo(true))
    );
    this.state.connect('isOpen', this.onClickOverlay$.pipe(mapTo(false)));
    this.state.connect('isOpen', this.onClickCloseButton$.pipe(mapTo(false)));
  }
}
