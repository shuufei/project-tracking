import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

type State = {
  isOpened: boolean;
};

@Component({
  selector: 'ui-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class PopupComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() isCloseWhenPopupAction = false;
  @Input()
  isOpened$: Observable<boolean> = new Subject<boolean>().asObservable();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  readonly isOpenedPopup$ = this.state.select('isOpened');

  private readonly changePopupPositionHandler$ = this.state
    .select('isOpened')
    .pipe(
      filter((isOpen) => isOpen),
      tap(() => {
        if (this.triggerEl === undefined) {
          return;
        }
        const triggerRect = this.triggerEl.getBoundingClientRect();
        const leftSpace = triggerRect.x;
        // TODO: windowをDI経由で利用するようにする
        const rightSpace =
          window.innerWidth - (triggerRect.x + triggerRect.width);
        (this.elementRef.nativeElement as HTMLElement).style[
          leftSpace > rightSpace ? 'right' : 'left'
        ] = '0';
      })
    );

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private state: RxState<State>
  ) {}

  ngOnInit(): void {
    this.state.hold(this.changePopupPositionHandler$);
    this.enableOpenPopupHandler();
    this.enableClosePopupHandler();
    this.state.connect('isOpened', this.isOpened$);
    this.state.hold(this.isOpenedPopup$, (isOpened) =>
      isOpened ? this.opened.emit() : this.closed.emit()
    );
  }

  private enableOpenPopupHandler() {
    if (this.triggerEl == null) {
      return;
    }
    this.state.hold(
      fromEvent(this.triggerEl, 'click').pipe(
        tap((e) => {
          this.state.set('isOpened', () => true);
          e.stopPropagation();
        })
      )
    );
  }

  private enableClosePopupHandler() {
    this.zone.runOutsideAngular(() => {
      // stopPropagation()しているイベントも捕捉するため、capture: trueをつける。
      this.state.hold(
        fromEvent(document, 'click', { capture: true }).pipe(
          filter((event) => {
            const isHostClicked = (this.elementRef
              .nativeElement as HTMLElement)?.contains(event.target as Node);
            const isTriggerCliked = this.triggerEl?.contains(
              event.target as Node
            );
            return (
              (this.isCloseWhenPopupAction ? true : !isHostClicked) &&
              !isTriggerCliked
            );
          }),
          tap(() => {
            this.state.set('isOpened', () => false);
            this.cd.detectChanges();
          })
        )
      );
    });
  }
}
