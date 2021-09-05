import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { fromEvent, Observable, Subject } from 'rxjs';
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
    trigger('fadeInOutSheet', [
      transition(':enter', [
        style({ transform: 'translateY(25%)' }),
        animate('0.2s 0s ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '0.15s 0s ease-out',
          style({ transform: 'translateY(25%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class SheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() title = '';
  @Input() zindex = '1';
  @Input()
  isOpen$: Observable<boolean> = new Subject<boolean>().asObservable();
  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  readonly state$ = this.state.select();

  /**
   * Events
   */
  readonly onClickOverlay$ = new Subject();
  readonly onClickCloseButton$ = new Subject();

  constructor(private readonly state: RxState<State>) {}

  ngOnInit(): void {
    if (this.triggerEl != null) {
      this.state.connect(
        'isOpen',
        fromEvent(this.triggerEl, 'click').pipe(mapTo(true))
      );
    }
    this.state.connect('isOpen', this.onClickOverlay$.pipe(mapTo(false)));
    this.state.connect('isOpen', this.onClickCloseButton$.pipe(mapTo(false)));
    this.state.connect('isOpen', this.isOpen$);
    this.state.set({
      isOpen: false,
    });
    this.state.hold(this.state.select('isOpen'), (isOpen) => {
      isOpen ? this.opened.emit() : this.closed.emit();
    });
  }
}
