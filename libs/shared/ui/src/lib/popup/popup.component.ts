import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'ui-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() triggerEl?: HTMLElement;
  @Output() closed = new EventEmitter<void>();

  readonly isOpen$ = new BehaviorSubject<boolean>(false);

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.triggerEl == null) {
      throw new Error('trigger element is undefined.');
    }
    this.enableOpenPopupHandler();
    this.enableClosePopupHandler();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private enableOpenPopupHandler() {
    fromEvent(this.triggerEl, 'click')
      .pipe(
        tap(() => {
          this.isOpen$.next(true);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private enableClosePopupHandler() {
    this.zone.runOutsideAngular(() => {
      fromEvent(document, 'click')
        .pipe(
          filter((event) => {
            const isHostClicked = (this.elementRef
              .nativeElement as HTMLElement).contains(event.target as Node);
            const isTriggerCliked = this.triggerEl.contains(
              event.target as Node
            );
            return !isHostClicked && !isTriggerCliked;
          }),
          tap(() => {
            this.isOpen$.next(false);
            this.closed.emit();
            this.cd.detectChanges();
          }),
          takeUntil(this.onDestroy$)
        )
        .subscribe();
    });
  }
}
