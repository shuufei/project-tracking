import { animate, style, transition, trigger } from '@angular/animations';
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
  animations: [
    trigger('fadeInOutOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s 0s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.25s 0s ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeInOutSheet', [
      transition(':enter', [
        style({ transform: 'translateY(25%)' }),
        animate('0.2s 0s ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '0.2s 0s ease-out',
          style({ transform: 'translateY(25%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class SheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() title = '';

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
    this.state.set({
      isOpen: false,
    });
  }
}
