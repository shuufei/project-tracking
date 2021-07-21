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

type State = {
  isOpen: boolean;
};

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
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
    trigger('fadeInOutDialog', [
      transition(':enter', [
        style({ transform: 'translate(-50%, -8%)' }),
        animate('0.2s 0s ease-out', style({ transform: 'translate(-50%, 0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translate(-50%, 0)', opacity: 1 }),
        animate(
          '0.15s 0s ease-out',
          style({ transform: 'translate(-50%, -8%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class DialogComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() zindex = '';
  @Input() isOpen$: Observable<boolean> = new Subject<boolean>().asObservable();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  readonly state$ = this.state.select();

  readonly onClickOverlay$ = new Subject();

  constructor(private readonly state: RxState<State>) {}

  ngOnInit(): void {
    if (this.triggerEl != null) {
      this.state.connect(
        'isOpen',
        fromEvent(this.triggerEl, 'click').pipe(mapTo(true))
      );
    }
    this.state.connect('isOpen', this.isOpen$);
    this.state.connect('isOpen', this.onClickOverlay$.pipe(mapTo(false)));
    this.state.set({
      isOpen: false,
    });
    this.state.hold(this.state.select('isOpen'), (isOpen) => {
      isOpen ? this.opened.emit() : this.closed.emit();
    });
  }
}
